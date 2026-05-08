import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFoundPage");

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center relative">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 w-full">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">{t("label")}</div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              {t("heading")}
              <br />
              <span className="text-muted-foreground">{t("headingAccent")}</span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md">
            {t("description")}
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>{t("backToHome")}</span>
          </Link>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
};
