"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  color: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    company: "CarDekho",
    role: "Senior Motion Designer",
    period: "2023 — Present",
    description:
      "Leading motion design for India's largest auto platform. Creating high-impact campaign videos, UI animations, and brand motion systems at scale.",
    color: "#00ff88",
    skills: ["After Effects", "Cinema 4D", "Brand Motion", "Team Lead"],
  },
  {
    company: "HealthKart",
    role: "Associate Motion Designer",
    period: "2022 — 2023",
    description:
      "Designed performance-driven video ads and social media content for MuscleBlaze, HK Vitals, and other D2C health brands.",
    color: "#ff3366",
    skills: ["Performance Ads", "Social Content", "Premiere Pro", "Figma"],
  },
  {
    company: "88gravity",
    role: "Motion Designer",
    period: "2021 — 2022",
    description:
      "Crafted motion graphics, explainers, and brand videos for diverse agency clients spanning tech, lifestyle, and e-commerce sectors.",
    color: "#ffaa00",
    skills: ["Explainers", "Motion Graphics", "Client Work", "Illustration"],
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] mr-8 md:mr-12"
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 md:p-10 relative overflow-hidden group hover:border-white/[0.12] transition-colors duration-500">
        {/* Decorative number */}
        <div
          className="absolute -top-4 -right-4 text-[120px] font-black opacity-[0.03] leading-none select-none"
          style={{ color: exp.color }}
        >
          0{index + 1}
        </div>

        {/* Period badge */}
        <div
          className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] rounded-full border mb-6"
          style={{ borderColor: `${exp.color}40`, color: exp.color }}
        >
          {exp.period}
        </div>

        {/* Company */}
        <h3
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: exp.color }}
        >
          {exp.company}
        </h3>

        {/* Role */}
        <div className="text-white/80 text-sm md:text-base font-medium mb-6">
          {exp.role}
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] mb-6" style={{ background: exp.color }} />

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          {exp.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded border border-white/[0.08] text-white/40"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Hover gradient */}
        <div
          className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    const totalScroll = track.scrollWidth - container.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="horizontal-scroll-section relative min-h-screen"
    >
      <div ref={containerRef} className="h-screen flex flex-col justify-center overflow-hidden">
        {/* Section header */}
        <div className="px-6 md:px-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[#00ff88] text-xs font-mono tracking-[0.4em] uppercase mb-4">
              Career Journey
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Experience<span className="text-[#00ff88]">.</span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="horizontal-track flex pl-6 md:pl-12"
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}

          {/* End card */}
          <div className="flex-shrink-0 w-[60vw] md:w-[30vw] flex items-center justify-center">
            <div className="text-center">
              <motion.div
                className="text-6xl md:text-8xl font-black text-white/[0.03]"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                ✦
              </motion.div>
              <div className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase mt-4">
                & More to Come
              </div>
            </div>
          </div>
        </div>

        {/* Progress line */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12">
          <div className="h-[1px] bg-white/[0.06] relative overflow-hidden">
            <motion.div
              className="h-full bg-[#00ff88] absolute left-0 top-0"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}