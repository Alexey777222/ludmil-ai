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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const stepIcons = [
  { icon: "📋", bg: "from-gold/20 to-gold/5" },
  { icon: "💬", bg: "from-wine/20 to-wine/5" },
  { icon: "👩‍🍳", bg: "from-gold/20 to-gold/5" },
  { icon: "🚚", bg: "from-wine/20 to-wine/5" },
];

export default function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Array<{ title: string; description: string }>;

  return (
    <section id="howItWorks" className="relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream mb-6">
              {t("title")}
            </h2>
            <div className="w-16 h-0.5 bg-gold/60 mx-auto" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="relative h-full">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/30 to-transparent" />
                )}

                <div className="relative p-6 md:p-8 rounded-2xl bg-dark-card border border-white/5 h-full transition-all duration-300 hover:border-gold/20 hover:shadow-[0_0_30px_rgba(197,160,89,0.05)]">
                  {/* Number */}
                  <div className="text-5xl font-serif text-gold/10 absolute top-4 right-6 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stepIcons[i].bg} flex items-center justify-center text-2xl mb-6`}>
                    {stepIcons[i].icon}
                  </div>

                  <h3 className="text-lg font-serif text-cream mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
