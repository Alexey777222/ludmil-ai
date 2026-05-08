"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-dark-card via-deep-dark to-wine/20 border border-white/5">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      className="mx-auto mb-4 text-gold/30"
                    >
                      <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M30 35c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M20 55c0-8 9-14 20-14s20 6 20 14" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <p className="text-text-muted text-sm italic">
                      Lydmila Papyan
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative gold line */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-gold/20 rounded-tr-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-gold/20 rounded-bl-2xl" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream mb-8 leading-tight">
                {t("title")}
              </h2>
              <div className="w-16 h-0.5 bg-gold/60 mb-8" />
              <p className="text-text-muted leading-relaxed text-base md:text-lg">
                {t("content")}
              </p>

              {/* Signature qualities */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: "Artigianale", icon: "✋" },
                  { label: "Naturale", icon: "🌿" },
                  { label: "Tradizionale", icon: "📜" },
                  { label: "Premium", icon: "⭐" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-dark-card/50 border border-white/5"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-cream/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
