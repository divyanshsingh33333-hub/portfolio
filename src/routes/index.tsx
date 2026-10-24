import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Menu,
  X,
  Send,
  Check,
  Plus,
  Sparkles,
  Cpu,
  Globe2,
  Orbit,
  Command,
  Terminal,
  Award,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BootSequence, ExperienceEffects } from "@/components/portfolio/ExperienceEffects";
import { getGitHubRepos, type GitHubRepo } from "@/lib/github.functions";
import { profile, projects, skills } from "@/lib/portfolio";

const SpaceScene = lazy(() => import("@/components/portfolio/SpaceScene"));
const sections = ["About", "Skills", "Projects", "Experience", "Contact"];
const titles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

const githubReposQueryOptions = queryOptions({
  queryKey: ["github-repos"],
  queryFn: () => getGitHubRepos(),
});

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context }) => context.queryClient.ensureQueryData(githubReposQueryOptions),
  head: () => ({
    meta: [
      { title: "Divyansh Singh — Engineering a new perspective" },
      {
        name: "description",
        content:
          "A personal universe of AI, full-stack engineering, and immersive digital experiences. Explore selected work, capabilities, and the next mission.",
      },
      { property: "og:title", content: "Divyansh Singh — A personal universe" },
      {
        property: "og:description",
        content:
          "Engineering intelligence. Building experiences. Explore a cinematic portfolio of ideas and possibilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Divyansh Singh — Personal Universe",
          description: "AI and full-stack engineering portfolio",
        }),
      },
    ],
  }),
});

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  number,
  label,
  title,
  subtitle,
}: {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div className="section-label mono">
        <span>{number} /</span> {label}
      </div>
      <div className="section-title-row">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </Reveal>
  );
}

function GitHubFeed({ repos }: { repos: GitHubRepo[] }) {
  return (
    <div className="github-feed">
      <div className="github-feed-head mono">
        <Github size={14} /> LIVE FROM GITHUB
        <span>{profile.github.replace(/^https?:\/\//, "")}</span>
      </div>
      {repos.length === 0 ? (
        <div className="github-feed-empty mono">REPOS DOCKING SOON — CONNECTING THE CODEBASE</div>
      ) : (
        <div className="github-feed-grid">
          {repos.map((repo) => (
            <a
              key={repo.name}
              className="github-repo"
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="repo-name mono">{repo.name}</span>
              <p>{repo.description || "Open the repository to explore the code."}</p>
              <div className="repo-meta mono">
                <span>{repo.language || "CODE"}</span>
                <span>★ {repo.stars}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Index() {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(1);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    setHydrated(true);
    try {
      const canvas = document.createElement("canvas");
      setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
    const scroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setTitle((value) => (value + 1) % titles.length), 3200);
    return () => clearInterval(timer);
  }, [reduced]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  const missingLink = (label: string) => setNotice(`${label} is awaiting your personal details.`);
  const skill = skills[selectedSkill];
  const { data: repoData } = useSuspenseQuery(githubReposQueryOptions);
  return (
    <div className="portfolio">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <BootSequence />
      <ExperienceEffects />
      <header className={`navigation ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#home" className="brand" aria-label="Divyansh Singh home">
          <span className="brand-symbol">✳</span>
          <span>
            ds<span className="brand-dot">.</span>
          </span>
        </a>
        <nav className={menu ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className={active === section.toLowerCase() ? "active" : ""}
              onClick={() => setMenu(false)}
            >
              {section}
            </a>
          ))}
        </nav>
        <Button variant="glass" className="nav-contact" asChild>
          <a href="#contact">
            Let’s talk <ArrowUpRight />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </Button>
      </header>
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-grid" aria-hidden />
          <div className="hero-orbit" aria-hidden />
          <div className="hero-scene" aria-hidden>
            {hydrated && webgl ? (
              <Suspense fallback={<div className="core-fallback" />}>
                <SpaceScene reducedMotion={Boolean(reduced)} />
              </Suspense>
            ) : (
              <div className="core-fallback" />
            )}
          </div>
          <div className="hero-status mono">
            <span className="status-dot" /> SYSTEM ONLINE{" "}
            <span className="status-separator">/</span> AVAILABLE FOR OPPORTUNITIES
          </div>
          <div className="hero-content">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <div className="hero-eyebrow mono">HELLO, UNIVERSE. I’M</div>
              <h1>
                {profile.name}
                <span className="heading-period">.</span>
              </h1>
              <div className="title-line">
                <span className="title-marker" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={title}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {titles[title]}
                  </motion.span>
                </AnimatePresence>
                <span className="type-caret">_</span>
              </div>
              <p className="hero-description">
                Engineering intelligence.
                <br />
                Building experiences.
                <br />
                <span>Exploring what comes next.</span>
              </p>
              <div className="hero-actions">
                <Button variant="cosmic" asChild>
                  <a href="#projects">
                    Explore my work <ArrowUpRight />
                  </a>
                </Button>
                <Button
                  variant="glass"
                  onClick={() =>
                    profile.resume
                      ? window.open(profile.resume, "_blank", "noopener,noreferrer")
                      : missingLink("Resume")
                  }
                >
                  <Download /> Resume
                </Button>
              </div>
              <div className="hero-socials">
                {profile.github ? (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                    >
                      <Github />
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="GitHub profile"
                    onClick={() => missingLink("GitHub profile")}
                  >
                    <Github />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="LinkedIn profile"
                  onClick={() => missingLink("LinkedIn profile")}
                >
                  <Linkedin />
                </Button>
                <span className="social-line" />
                <span className="mono">IDEAS → REALITY</span>
              </div>
            </motion.div>
          </div>
          <div className="core-caption mono">
            <span className="caption-cross">+</span>
            <div>
              NEURAL CORE · V.01
              <br />
              <span>A LITTLE CURIOSITY. INFINITE POSSIBILITY.</span>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#about" className="scroll-cue">
              <span className="scroll-icon">
                <ArrowDown />
              </span>
              <span className="mono">SCROLL TO EXPLORE</span>
            </a>
            <span className="hero-coordinates mono">
              EST. ON EARTH <span>↗</span> BUILT FOR BEYOND
            </span>
            <span className="mono hero-index">01 — 07</span>
          </div>
        </section>
        <div className="space-journey">
          <section id="about" className="section about-section">
            <SectionTitle
              number="01"
              label="THE HUMAN BEHIND THE CODE"
              title="Curiosity is my compass."
              subtitle="A builder’s mind. An explorer’s spirit."
            />
            <div className="about-grid">
              <Reveal className="about-copy">
                <p>
                  I’m <strong>{profile.name}</strong> — a developer drawn to the space where human
                  creativity meets machine intelligence.
                </p>
                <p>
                  I care about the details. The elegant solution. The interaction that just feels
                  right. Turning ambitious ideas into meaningful digital experiences is the mission.
                </p>
                <a href="#contact" className="text-link">
                  Let’s build something worth exploring <ArrowUpRight />
                </a>
                <span className="content-note mono">INTRODUCTION TEMPLATE · MAKE IT YOURS</span>
              </Reveal>
              <Reveal className="identity-panel">
                <div className="panel-top mono">
                  <Cpu size={16} /> HUMAN.SYSTEM <span className="status-dot" />
                </div>
                <div className="identity-row">
                  <span>BASE LOCATION</span>
                  <span>{profile.location}</span>
                </div>
                <div className="identity-row">
                  <span>PRIMARY FOCUS</span>
                  <span>AI & full-stack engineering</span>
                </div>
                <div className="identity-row">
                  <span>CURRENT MISSION</span>
                  <span>Build. Learn. Repeat.</span>
                </div>
                <div className="identity-row">
                  <span>STATUS</span>
                  <span className="available">Ready for the next chapter</span>
                </div>
                <div className="panel-bottom mono">
                  <Terminal size={14} />
                  <span>human.potential = Infinity</span>
                </div>
              </Reveal>
            </div>
            <Reveal className="principles">
              <div>
                <span className="principle-number">01</span>
                <h3>Think beyond.</h3>
                <p>Curiosity over convention.</p>
              </div>
              <div>
                <span className="principle-number">02</span>
                <h3>Build with purpose.</h3>
                <p>Technology with a human center.</p>
              </div>
              <div>
                <span className="principle-number">03</span>
                <h3>Never stop exploring.</h3>
                <p>Every challenge, a new frontier.</p>
              </div>
            </Reveal>
          </section>
          <section id="skills" className="section skills-section">
            <SectionTitle
              number="02"
              label="MY TECHNOLOGY UNIVERSE"
              title="Different worlds. One orbit."
              subtitle="The tools I turn to. The possibilities they unlock."
            />
            <Reveal className="skills-universe">
              <div className="orbital-line orbital-one" aria-hidden />
              <div className="orbital-line orbital-two" aria-hidden />
              <div className="orbit-center" aria-hidden>
                <Command />
              </div>
              <div className="planets">
                {skills.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className={`planet-position planet-position-${i}`}
                    animate={reduced ? {} : { y: [0, -9, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Button
                      variant="ghost"
                      className={`planet-button ${item.className} ${selectedSkill === i ? "selected" : ""}`}
                      onClick={() => setSelectedSkill(i)}
                      onFocus={() => setSelectedSkill(i)}
                      onMouseEnter={() => setSelectedSkill(i)}
                      aria-pressed={selectedSkill === i}
                    >
                      <span className="planet-sphere">
                        {item.symbol}
                        <span className="planet-satellite" />
                      </span>
                      <span className="planet-name">{item.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {skill && (
                  <motion.div
                    className="skill-detail"
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="mono skill-category">{skill.type}</span>
                    <h3>{skill.name}</h3>
                    <p>{skill.description}</p>
                    <span className="mono skill-stack">{skill.tech}</span>
                    <div className="skill-projects">
                      Concept missions <span>{skill.projects}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
            <div className="skills-footnote mono">
              <Orbit size={14} /> ALWAYS EXPANDING MY ORBIT{" "}
              <span>+ GIT · DOCKER · SQL · CLOUD</span>
            </div>
          </section>
          <section id="projects" className="section projects-section">
            <SectionTitle
              number="03"
              label="SELECTED MISSIONS"
              title="Ideas, launched."
              subtitle="A few explorations at the edge of what’s possible."
            />
            <div className="project-grid">
              {projects.map((project, i) => (
                <Reveal
                  key={project.id}
                  className={`project-wrap ${i === 0 ? "featured-project" : ""}`}
                >
                  <motion.article
                    className="project-card"
                    whileHover={reduced ? {} : { y: -7, rotateX: 1, rotateY: -1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="project-image">
                      <img
                        src={project.image}
                        width={1024}
                        height={640}
                        loading="lazy"
                        alt={`${project.name} concept visualization`}
                      />
                      {i === 0 && (
                        <span className="featured-label mono">
                          <Sparkles size={12} /> FEATURED MISSION
                        </span>
                      )}
                      <span className="project-number mono">{project.id}</span>
                      <Button
                        variant="glass"
                        size="icon"
                        className="project-open"
                        aria-label={`Explore ${project.name}`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <ArrowUpRight />
                      </Button>
                    </div>
                    <div className="project-info">
                      <span className="mono project-category">{project.category}</span>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="tech-chips">
                        {project.stack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <Button variant="ghost" onClick={() => setSelectedProject(project)}>
                          Explore project <ArrowUpRight />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`${project.name} GitHub`}
                          onClick={() => missingLink(`${project.name} GitHub`)}
                        >
                          <Github />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
            <div className="projects-bottom mono">
              <span>CONCEPT MISSIONS · PERSONAL PROJECT DETAILS TO FOLLOW</span>
              <span>
                MORE IDEAS IN ORBIT <Plus size={14} />
              </span>
            </div>
            <GitHubFeed repos={repoData.repos} />
          </section>
          <section id="experience" className="section experience-section">
            <SectionTitle number="04" label="FLIGHT LOG" title="Every chapter, a new frontier." />
            <div className="timeline">
              <Reveal className="timeline-entry">
                <div className="timeline-date mono">
                  NEXT CHAPTER
                  <span className="timeline-dot" />
                </div>
                <div className="timeline-content">
                  <span className="mono">OPEN TO OPPORTUNITIES</span>
                  <h3>The next mission</h3>
                  <p>
                    Looking for meaningful challenges, thoughtful teams, and ideas that deserve to
                    exist.
                  </p>
                  <a href="#contact" className="text-link">
                    Start a conversation <ArrowUpRight />
                  </a>
                </div>
              </Reveal>
              <Reveal className="timeline-entry">
                <div className="timeline-date mono">
                  YOUR JOURNEY
                  <span className="timeline-dot" />
                </div>
                <div className="timeline-content">
                  <span className="mono">EXPERIENCE & EDUCATION</span>
                  <h3>Space for your story</h3>
                  <p>
                    Your roles, education, and milestones will appear here once you provide your
                    details.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
          <section id="certifications" className="section certifications-section">
            <SectionTitle
              number="05"
              label="CREDENTIALS & MILESTONES"
              title="Learning has no limits."
            />
            <Reveal className="credential-row">
              <div className="credential-icon">
                <Award />
              </div>
              <div>
                <span className="mono">CONTINUOUS EXPLORATION</span>
                <h3>Knowledge, earned along the way.</h3>
                <p>Your certifications and achievements will join this constellation.</p>
              </div>
              <span className="credential-symbol">✳</span>
            </Reveal>
          </section>
          <section id="contact" className="section contact-section">
            <SectionTitle
              number="06"
              label="MISSION CONTROL"
              title="Let’s make contact."
              subtitle="Have an idea? A possibility? A new frontier? I’m listening."
            />
            <div className="contact-grid">
              <Reveal className="contact-copy">
                <div className="contact-signal">
                  <span className="status-dot" />
                  <span className="mono">COMMUNICATION CHANNEL OPEN</span>
                </div>
                <h3>
                  Great things begin
                  <br />
                  with a simple hello<span>.</span>
                </h3>
                <p>
                  Let’s connect the dots between
                  <br />
                  your vision and what’s possible.
                </p>
                <a
                  className="email-link"
                  href={`mailto:${profile.email}`}
                  aria-label={`Email ${profile.name}`}
                >
                  {profile.email} <ArrowUpRight />
                </a>
                <div className="contact-socials">
                  {profile.github ? (
                    <Button variant="glass" asChild>
                      <a href={profile.github} target="_blank" rel="noopener noreferrer">
                        <Github /> GitHub <ArrowUpRight />
                      </a>
                    </Button>
                  ) : (
                    <Button variant="glass" onClick={() => missingLink("GitHub profile")}>
                      <Github /> GitHub <ArrowUpRight />
                    </Button>
                  )}
                  <Button variant="glass" onClick={() => missingLink("LinkedIn profile")}>
                    <Linkedin /> LinkedIn <ArrowUpRight />
                  </Button>
                </div>
              </Reveal>
              <Reveal>
                <form
                  className="contact-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!profile.email) {
                      setNotice("Add your contact email before messages can be sent.");
                      return;
                    }
                    const data = new FormData(event.currentTarget);
                    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${data.get("name")}`)}&body=${encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("email")}`)}`;
                    setSent(true);
                  }}
                >
                  <div className="form-header mono">
                    <Send size={14} /> NEW TRANSMISSION <span>↗</span>
                  </div>
                  <div className="form-fields">
                    <label>
                      Your name
                      <input
                        name="name"
                        placeholder="What should I call you?"
                        required
                        autoComplete="name"
                        maxLength={100}
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        placeholder="you@youruniverse.com"
                        required
                        autoComplete="email"
                      />
                    </label>
                    <label>
                      Your message
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell me about your next mission…"
                        required
                        maxLength={4000}
                      />
                    </label>
                  </div>
                  <Button variant="cosmic" type="submit" className="send-button">
                    {sent ? "Email draft launched" : "Launch transmission"}
                    {sent ? <Check /> : <ArrowUpRight />}
                  </Button>
                  <span className="form-note mono">
                    {profile.email
                      ? "MESSAGES ROUTE STRAIGHT TO MY INBOX"
                      : "CONTACT EMAIL NOT CONFIGURED YET"}
                  </span>
                </form>
              </Reveal>
            </div>
          </section>
          <footer className="footer">
            <div className="footer-top">
              <a href="#home" className="brand">
                <span className="brand-symbol">✳</span>
                <span>ds.</span>
              </a>
              <p>
                A curious mind.
                <br />
                An infinite universe.
              </p>
              <a href="#home" className="back-top mono">
                BACK TO EARTH <ArrowUpRight />
              </a>
            </div>
            <div className="footer-bottom mono">
              <span>© 2026 {profile.name.toUpperCase()}</span>
              <span>CRAFTED WITH INTENTION. BUILT TO EXPLORE.</span>
              <span>
                <span className="status-dot" /> ALL SYSTEMS ONLINE
              </span>
            </div>
          </footer>
        </div>
      </main>
      <Dialog
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="project-dialog">
          {selectedProject && (
            <>
              <img
                src={selectedProject.image}
                width={1024}
                height={640}
                alt={selectedProject.name}
              />
              <DialogHeader>
                <span className="mono">{selectedProject.detail}</span>
                <DialogTitle>{selectedProject.name}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="tech-chips">
                {selectedProject.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <p className="dialog-note">
                This is a concept preview, not a completed personal project. Your real project
                description and links will replace it.
              </p>
              <div className="dialog-actions">
                <Button
                  variant="cosmic"
                  onClick={() => missingLink(`${selectedProject.name} live demo`)}
                >
                  Live demo <ExternalLink />
                </Button>
                <Button
                  variant="glass"
                  onClick={() => missingLink(`${selectedProject.name} source code`)}
                >
                  <Github /> Source code
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {notice && (
          <motion.div
            className="notice"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Globe2 size={18} />
            <span>{notice}</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
