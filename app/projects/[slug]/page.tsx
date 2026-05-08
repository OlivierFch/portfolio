import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { Tag } from "@/components/ui/tag";
import { SiteFooter } from "@/components/layout/site-footer";

interface Highlight {
  title: string;
  description: string;
}

interface FeatureMedia {
  type: "image" | "video";
  src: string;
  caption?: string;
}

interface Project {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  overview: string;
  tech: string[];
  highlights: Highlight[];
  featureMedia?: FeatureMedia;
  learnings?: string[];
  github?: string;
  demo?: string;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const messages = await getMessages();
  const projectsData = (messages as Record<string, unknown>).projectsData as Record<string, Project>;
  const project = projectsData[slug];

  if (!project) notFound();

  const t = await getTranslations("projectPage");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <Link href="/#projects" className="group flex items-center gap-3" aria-label={t("backToProjects")}>
          <div className="w-2 h-8 rounded-full bg-muted-foreground/30 group-hover:bg-highlight transition-all duration-500 flex-shrink-0" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 select-none">
            {t("back")}
          </span>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header className="pt-20 sm:pt-32 pb-12 sm:pb-16 space-y-8">
          <Link
            href="/#projects"
            className="lg:hidden inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t("back")}
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <span>{project.date}</span>
              <span>·</span>
              <span>{project.readTime} {t("read")}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">{project.title}</h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">{project.excerpt}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((tech) => <Tag key={tech} tagLabel={tech} />)}
            </div>
          </div>

          <div className="border-t border-border" />
        </header>

        <section className="py-12 sm:py-16 space-y-6">
          <div className="text-sm text-foreground font-mono font-semibold tracking-wider">{t("overviewLabel")}</div>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">{project.overview}</p>
        </section>

        {project.featureMedia && (
          <section className="py-12 sm:py-16 space-y-6">
            <div className="text-sm text-foreground font-mono font-semibold tracking-wider">{t("featureMediaLabel")}</div>
            <figure className="space-y-3">
              {project.featureMedia.type === "image" ? (
                <img
                  src={project.featureMedia.src}
                  alt={project.featureMedia.caption ?? project.title}
                  className="w-full rounded-xl border border-border object-cover"
                />
              ) : (
                <video
                  src={project.featureMedia.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full rounded-xl border border-border"
                />
              )}
              {project.featureMedia.caption && (
                <figcaption className="text-xs text-muted-foreground font-mono">{project.featureMedia.caption}</figcaption>
              )}
            </figure>
          </section>
        )}

        <section className="py-12 sm:py-16 space-y-6">
          <div className="text-sm text-foreground font-mono font-semibold tracking-wider">{t("highlightsLabel")}</div>
          <div className="space-y-0">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-12 gap-4 sm:gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
              >
                <div className="lg:col-span-1 text-xl font-light text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="lg:col-span-11 space-y-3">
                  <h3 className="text-lg sm:text-xl font-medium">{h.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {project.learnings && project.learnings.length > 0 && (
          <section className="py-12 sm:py-16 space-y-6">
            <div className="text-sm text-foreground font-mono font-semibold tracking-wider">{t("learningsLabel")}</div>
            <ul className="space-y-4">
              {project.learnings.map((item, i) => (
                <li key={i} className="border-l-2 border-muted-foreground/30 pl-4 text-muted-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(project.github || project.demo) && (
          <section className="py-12 sm:py-16 space-y-6">
            <div className="text-sm text-foreground font-mono font-semibold tracking-wider">{t("linksLabel")}</div>
            <div className="flex flex-wrap gap-6">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  <span>{t("github")}</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  <span>{t("liveDemo")}</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          </section>
        )}

        <SiteFooter />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
