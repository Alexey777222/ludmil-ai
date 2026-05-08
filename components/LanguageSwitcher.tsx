"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

const locales = [
  { code: "it", flag: "IT" },
  { code: "en", flag: "GB" },
  { code: "ru", flag: "RU" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      {locales.map(({ code, flag }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          disabled={isPending}
          className={`
            relative px-2 py-1 text-xs font-medium rounded transition-all duration-300
            ${
              locale === code
                ? "text-gold bg-gold/10 border border-gold/30"
                : "text-text-muted hover:text-cream hover:bg-white/5 border border-transparent"
            }
          `}
          aria-label={t(code as "it" | "en" | "ru")}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}
