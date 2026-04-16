"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  category: string;
  color: string;
  gradient: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Crack-Ed",
    subtitle: "Rebranding",
    category: "Brand Identity",
    color: "#00ff88",
    gradient: "from-[#00ff88]/20 to-[#0a0a0a]",
    year: "2024",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/e556ff206492717.Y3JvcCw4NDIsNjU5LDI3OSww.gif",
    link: "https://www.behance.net/gallery/206492717/Crack-Ed-Rebranding-Exercise"
  },
  {
    title: "Gubbins",
    subtitle: "Motion Video",
    category: "Delivery App",
    color: "#ff3366",
    gradient: "from-[#ff3366]/20 to-[#0a0a0a]",
    year: "2024",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/26f268222735281.Y3JvcCw4MjYsNjU2LDAsMjg4.png",
    link: "https://www.behance.net/gallery/222735281/Gubbins-Delivery-App-Motion-Video"
  },
  {
    title: "MuscleBlaze",
    subtitle: "Launch Video",
    category: "Product Launch",
    color: "#ffaa00",
    gradient: "from-[#ffaa00]/20 to-[#0a0a0a]",
    year: "2023",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/8310c4185404749.Y3JvcCwxMDgwLDg0NCwwLDExNw.png",
    link: "https://www.behance.net/gallery/185404749/MuscleBlaze-Product-Launch-video"
  },
  {
    title: "HK VITAL",
    subtitle: "Performance Video",
    category: "Marketing",
    color: "#00aaff",
    gradient: "from-[#00aaff]/20 to-[#0a0a0a]",
    year: "2023",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/6ec1f1190428745.Y3JvcCwxMDgwLDg0NCwwLDExNw.jpg",
    link: "https://www.behance.net/gallery/190428745/HK-VITAL-Performance-Marketing-Video"
  },
  {
    title: "Rupyy",
    subtitle: "Udaan Utsav",
    category: "Event Identity",
    color: "#aa66ff",
    gradient: "from-[#aa66ff]/20 to-[#0a0a0a]",
    year: "2024",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/6c4c77191646795.Y3JvcCw4NDUsNjYxLDI3OCww.png",
    link: "https://www.behance.net/gallery/191646795/Rupyy-Udaan-Utsav-Event-Visual-Identity-Design"
  },
  {
    title: "ViewSonic",
    subtitle: "Motion Graphics",
    category: "Product Promo",
    color: "#ffffff",
    gradient: "from-white/10 to-[#0a0a0a]",
    year: "2023",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/877c9b172767809.Y3JvcCwxMDgwLDg0NCwwLDExNw.png",
    link: "https://www.behance.net/gallery/172767809/ViewSonic-Video-And-Motion-Graphics"
  }
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
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
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
      className="project-card group relative block cursor-none"
      data-cursor="project"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm h-full">
        {/* Project visual area */}
        <div className={`relative h-[280px] md:h-[420px] bg-[#111] overflow-hidden`}>
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] rounded-full border backdrop-blur-md"
              style={{ borderColor: `${project.color}40`, color: project.color }}
            >
              {project.category}
            </span>
          </div>

          {/* Year */}
          <div
            className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-white/50"
          >
            {project.year}
          </div>

          {/* Video play button mock */}
          <motion.div
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full border flex items-center justify-center bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
            style={{ borderColor: `${project.color}60` }}
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 12 14"
              fill={project.color}
            >
              <path d="M0 0L12 7L0 14V0Z" />
            </svg>
          </motion.div>
        </div>

        {/* Card info */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00ff88] transition-colors duration-300">
            {project.title}{" "}
            <span className="text-white/30 font-light block md:inline text-lg md:text-xl">{project.subtitle}</span>
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <motion.div
              className="h-[1px] bg-current flex-1 origin-left"
              style={{ color: project.color }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-[#00ff88] transition-colors">
              Explore Case Study
            </span>
          </div>
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${project.color}30, 0 0 40px ${project.color}10`,
          }}
        />
      </div>
    </motion.a>
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
        className="mb-16 md:mb-24 text-center md:text-left"
      >
        <div className="text-[#00ff88] text-xs font-mono tracking-[0.4em] uppercase mb-4">
          Selected Works
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
          Featured <span className="text-shimmer italic">Projects</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-[1600px] mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}

        {/* CTA card */}
        <motion.a
          href="https://www.behance.net/rahulrajput8"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative flex items-center justify-center min-h-[400px] rounded-2xl border border-dashed border-white/10 hover:border-[#00ff88]/30 transition-all duration-500 group overflow-hidden bg-white/[0.01]"
          data-cursor="link"
        >
          <div className="text-center z-10">
            <div className="text-4xl md:text-6xl font-bold text-white/10 group-hover:text-[#00ff88] transition-all duration-300 group-hover:scale-125">
              +
            </div>
            <div className="mt-4 text-[10px] font-mono tracking-[0.4em] uppercase text-white/20 group-hover:text-[#00ff88]/60 transition-colors">
              View All 12+ Projects on Behance
            </div>
          </div>
          
          {/* Animated background element */}
          <motion.div 
            className="absolute w-64 h-64 bg-[#00ff88]/5 blur-[100px] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.a>
      </div>
    </section>
  );
}