import { createServerFn } from "@tanstack/react-start";

import { profile } from "@/lib/portfolio";

export type GitHubRepo = {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
};

export const getGitHubRepos = createServerFn({ method: "GET" }).handler(async () => {
  const fallback: { repos: GitHubRepo[] } = { repos: [] };
  const apiKey = process.env["LOVABLE_API_KEY"];
  const githubApiKey = process.env["GITHUB_API_KEY"];
  if (!apiKey || !githubApiKey) {
    console.error("GitHub connector secrets are missing; returning an empty repo list.");
    return fallback;
  }
  const login = profile.github.split("/").filter(Boolean).pop();
  if (!login) return fallback;
  try {
    const response = await fetch(
      `https://connector-gateway.lovable.dev/github/users/${login}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${apiKey}`,
          "X-Connection-Api-Key": githubApiKey,
        },
      },
    );
    if (!response.ok) {
      console.error(`GitHub repo fetch failed [${response.status}]: ${await response.text()}`);
      return fallback;
    }
    const data = (await response.json()) as Array<{
      fork: boolean;
      html_url: string;
      name: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
    }>;
    return {
      repos: data
        .filter((repo) => !repo.fork)
        .slice(0, 6)
        .map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description ?? "",
          language: repo.language ?? "",
          stars: repo.stargazers_count,
        })),
    };
  } catch (error) {
    console.error(error);
    return fallback;
  }
});
