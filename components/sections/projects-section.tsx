"use client"

import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Post {
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: string
}

export const ProjectsSection = forwardRef<HTMLElement>(function ProjectsSection(_, ref) {
  const t = useTranslations("projects");
  const posts: Post[] = t.raw("posts");

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light font-semibold">{t("heading")}</h2>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/projects/${post.slug}`}
              className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg text-left w-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <span>{t("readMore")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
})
