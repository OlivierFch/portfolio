"use client"

import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import { Tag } from "../ui/tag";

export const IntroSection = forwardRef<HTMLElement>(function IntroSection(_, ref) {
  const t = useTranslations("intro");
  const skills: string[] = t.raw("skills");

  return (
    <header
      id="intro"
      ref={ref}
      className="min-h-screen flex items-center opacity-0"
    >
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-2">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">{t("label")}</div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              {t("firstName")}
              <br />
              <span className="text-muted-foreground">{t("lastName")}</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {t.rich("bio", {
                highlight: (chunks) => <span className="text-foreground">{chunks}</span>,
              })}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {t("availableForWork")}
              </div>
              <div>{t("location")}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">{t("currentlyLabel")}</div>
            <div className="space-y-2">
              <div className="text-foreground">{t("currentRole")}</div>
              <div className="text-muted-foreground">{t("currentCompany")}</div>
              <div className="text-xs text-muted-foreground">{t("currentPeriod")}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">{t("focusLabel")}</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => <Tag key={skill} tagLabel={skill} />)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
