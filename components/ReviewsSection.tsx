"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const reviews = t.raw("items") as Array<{ name: string; text: string; rating: number }>;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="reviews" className="relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream mb-6">
              {t("title")}
            </h2>
            <div className="w-16 h-0.5 bg-gold/60 mx-auto" />
          </div>
        </Reveal>

        <Reveal>
          <div className="relative">
            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-gold/20 transition-all duration-500 group"
                >
                  {/* Quote mark */}
                  <div className="text-5xl font-serif text-gold/10 absolute top-4 right-6 leading-none">
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <svg
                        key={j}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-gold"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-wine/30 flex items-center justify-center text-cream text-sm font-serif">
                      {review.name.charAt(0)}
                    </div>
                    <span className="text-cream text-sm font-medium">
                      {review.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <motion.div
                  animate={{ x: `-${activeIndex * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex"
                >
                  {reviews.map((review, i) => (
                    <div key={i} className="min-w-full px-2">
                      <div className="p-6 rounded-2xl bg-dark-card border border-white/5">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <svg
                              key={j}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-gold"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed mb-4 italic">
                          &ldquo;{review.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-wine/30 flex items-center justify-center text-cream text-xs font-serif">
                            {review.name.charAt(0)}
                          </div>
                          <span className="text-cream text-sm">
                            {review.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "bg-gold w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
