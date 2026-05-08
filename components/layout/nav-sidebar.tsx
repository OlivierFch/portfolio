"use client"

import { useTranslations } from "next-intl"

interface NavSidebarProps {
  activeSection: string
}

export function NavSidebar({ activeSection }: NavSidebarProps) {
  const t = useTranslations("nav")
  const sections: string[] = t.raw("sections")

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className="group/item flex items-center gap-3"
            aria-label={t("navigateTo", { section })}
          >
            <div
              className={`w-2 h-8 rounded-full transition-all duration-500 flex-shrink-0 ${activeSection === section ? "bg-highlight" : "bg-muted-foreground/30 group-hover/item:bg-muted-foreground/60"}`}
            />
            <span
              className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 select-none ${activeSection === section
                ? "opacity-100 translate-x-0 text-highlight"
                : "opacity-0 -translate-x-1 text-muted-foreground group-hover/item:opacity-100 group-hover/item:translate-x-0"
                }`}
            >
              {section}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
