"use client"

import { forwardRef } from "react";
import { useTranslations } from "next-intl";

interface Job {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const WorkSection = forwardRef<HTMLElement>(function WorkSection(_, ref) {
  const t = useTranslations("work");
  const jobs: Job[] = t.raw("jobs");

  return (
    <section
      id="work"
      ref={ref}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light font-semibold">{t("heading")}</h2>
          <div className="text-sm text-muted-foreground font-mono">{t("timeline")}</div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-2">
                <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {job.year}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                  <div className="text-muted-foreground">{job.company}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                {job.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});
