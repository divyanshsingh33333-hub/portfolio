import { describe, expect, it } from "vitest";

import { profile } from "@/lib/portfolio";

describe("Portfolio identity", () => {
  it("links the verified GitHub profile", () => {
    expect(profile.github).toBe("https://github.com/divyanshsingh33333-hub");
  });
});
