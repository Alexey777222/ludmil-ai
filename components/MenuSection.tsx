"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const dishImages = {
  pelmeni: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231A1A1A'/%3E%3Cellipse cx='200' cy='150' rx='120' ry='80' fill='%23C5A059' opacity='0.15'/%3E%3Ccircle cx='130' cy='140' r='25' fill='%23C5A059' opacity='0.25'/%3E%3Ccircle cx='200' cy='150' r='25' fill='%23C5A059' opacity='0.25'/%3E%3Ccircle cx='270' cy='145' r='25' fill='%23C5A059' opacity='0.25'/%3E%3Ccircle cx='165' cy='175' r='22' fill='%23C5A059' opacity='0.2'/%3E%3Ccircle cx='235' cy='180' r='22' fill='%23C5A059' opacity='0.2'/%3E%3C/svg%3E",
  khinkali: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231A1A1A'/%3E%3Cellipse cx='200' cy='150' rx='120' ry='80' fill='%238B0000' opacity='0.15'/%3E%3Cpath d='M140 160 Q200 110 260 160 Q240 200 200 210 Q160 200 140 160Z' fill='%238B0000' opacity='0.25'/%3E%3Cpath d='M170 170 Q200 140 230 170 Q220 195 200 200 Q180 195 170 170Z' fill='%23C5A059' opacity='0.2'/%3E%3C/svg%3E",
  vareniki: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231A1A1A'/%3E%3Cellipse cx='200' cy='150' rx='120' ry='80' fill='%23C5A059' opacity='0.15'/%3E%3Cellipse cx='160' cy='140' rx='40' ry='25' fill='%23C5A059' opacity='0.2' transform='rotate(-15 160 140)'/%3E%3Cellipse cx='250' cy='150' rx='40' ry='25' fill='%23C5A059' opacity='0.2' transform='rotate(10 250 150)'/%3E%3Ccircle cx='160' cy='140' r='10' fill='%238B0000' opacity='0.3'/%3E%3Ccircle cx='250' cy='150' r='10' fill='%238B0000' opacity='0.3'/%3E%3C/svg%3E",
};

export default function MenuSection() {
  const t = useTranslations("menu");
  const categories = ["pelmeni", "khinkali", "vareniki"] as const;

  return (
    <section id="menu" className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream mb-6">
              {t("title")}
            </h2>
            <div className="w-16 h-0.5 bg-gold/60 mx-auto" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((key, i) => {
            const item = t.raw(`categories.${key}`) as {
              name: string;
              description: string;
              ingredients: string;
              price: string;
            };
            return (
              <Reveal key={key} delay={i * 0.15}>
                <motion.div
                  className="group relative bg-dark-card rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 glow-gold"
                  whileHover={{ y: -8 }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={dishImages[key]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-serif text-cream mb-3">
                      {item.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gold/60 shrink-0"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                      <span className="text-xs text-text-muted">
                        {item.ingredients}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-2xl font-serif text-gold">
                        {item.price}
                      </span>
                      <button className="px-5 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm rounded-full transition-all duration-300 hover:bg-gold hover:text-deep-dark hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                        {t("order")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
