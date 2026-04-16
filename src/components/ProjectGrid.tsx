"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  category: string;
  color: string;
  gradient: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Crack-Ed",
    subtitle: "Rebranding",
    category: "Brand Identity",
    color: "#00ff88",
    gradient: "from-[#00ff88]/20 to-[#0a0a0a]",
    year: "2024",
  },
  {
    title: "Gubbins",
    subtitle: "Delivery App",
    category: "UI/UX · Motion",
    color: "#ff3366",
    gradient: "from-[#ff3366]/20 to-[#0a0a0a]",
    year: "2024",
  },
  {
    title: "MuscleBlaze",
    subtitle: "Launch Campaign",
    category: "Motion Graphics",
    color: "#ffaa00",
    gradient: "from-[#ffaa00]/20 to-[#0a0a0a]",
    year: "2023",
  },
  {
    title: "HK VITAL",
    subtitle: "Marketing",
    category: "Social · Video",
    color: "#00aaff",
    gradient: "from-[#00aaff]/20 to-[#0a0a0a]",
    year: "2023",
  },
  {
    title: "Rupyy",
    subtitle: "Udaan Utsav",
    category: "Campaign Design",
    color: "#aa66ff",
    gradient: "from-[#aa66ff]/20 to-[#0a0a0a]",
    year: "2024",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group relative cursor-none"
      data-cursor="project"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
        {/* Project visual area */}
        <div className={`relative h-[280px] md:h-[360px] bg-gradient-to-br ${project.gradient} overflow-hidden`}>
          {/* Animated shapes as visual placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Large letter */}
            <motion.div
              className="text-[120px] md:text-[180px] font-black opacity-[0.06] select-none"
              style={{ color: project.color }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + index,
                ease: "easeInOut",
              }}
            >
              {project.title[0]}
            </motion.div>
          </div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute w-20 h-20 rounded-full blur-xl"
            style={{
              background: project.color,
              opacity: 0.2,
              left: `${30 + mousePos.x * 20}%`,
              top: `${40 + mousePos.y * 20}%`,
            }}
            transition={{ type: "spring", damping: 20 }}
          />
          <motion.div
            className="absolute w-32 h-1 rounded-full"
            style={{
              background: project.color,
              opacity: 0.4,
              right: "10%",
              bottom: "20%",
              rotate: `${-15 + mousePos.x * 10}deg`,
            }}
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] rounded-full border"
              style={{ borderColor: `${project.color}40`, color: project.color }}
            >
              {project.category}
            </span>
          </div>

          {/* Year */}
          <div
            className="absolute top-4 right-4 text-[10px] font-mono tracking-widest"
            style={{ color: `${project.color}80` }}
          >
            {project.year}
          </div>

          {/* Video play button mock */}
          <motion.div
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderColor: `${project.color}60` }}
          >
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill={project.color}
            >
              <path d="M0 0L12 7L0 14V0Z" />
            </svg>
          </motion.div>
        </div>

        {/* Card info */}
        <div className="p-5 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00ff88] transition-colors duration-300">
            {project.title}{" "}
            <span className="text-white/40 font-light">{project.subtitle}</span>
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <motion.div
              className="h-[1px] bg-current flex-1 origin-left"
              style={{ color: project.color }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
              Behance
            </span>
          </div>
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${project.color}30, 0 0 30px ${project.color}10`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-40 px-6 md:px-12">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <div className="text-[#00ff88] text-xs font-mono tracking-[0.4em] uppercase mb-4">
          Selected Works
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold">
          Featured <span className="text-shimmer">Projects</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}

        {/* CTA card */}
        <motion.a
          href="https://www.behance.net"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative flex items-center justify-center min-h-[280px] md:min-h-[360px] rounded-2xl border border-dashed border-white/10 hover:border-[#00ff88]/30 transition-colors duration-500 group"
          data-cursor="link"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white/20 group-hover:text-[#00ff88] transition-colors duration-300">
              +
            </div>
            <div className="mt-2 text-xs font-mono tracking-[0.3em] uppercase text-white/30 group-hover:text-[#00ff88]/60 transition-colors">
              View All on Behance
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}