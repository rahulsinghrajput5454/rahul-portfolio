"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function MagneticLetter({ char, index }: { char: string; index: number }) {
  const letterRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!letterRef.current) return;
    const rect = letterRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDist = 150;

    if (distance < maxDist) {
      const force = (1 - distance / maxDist) * 25;
      gsap.to(letterRef.current, {
        x: (deltaX / distance) * force,
        y: (deltaY / distance) * force,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(letterRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (char === " ") {
    return <span className="inline-block w-[0.3em]" />;
  }

  return (
    <motion.span
      ref={letterRef}
      className="magnetic-letter inline-block text-white hover:text-[#00ff88] transition-colors duration-200"
      initial={{ opacity: 0, y: 80, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 1.4 + index * 0.04,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {char}
    </motion.span>
  );
}

export default function HeroSection() {
  const name = "RAHUL KUMAR SINGH";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-gradient-orb",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 2, delay: 1.2, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background gradient orbs */}
      <div className="hero-gradient-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00ff88] blur-[200px] opacity-0" />
      <div className="hero-gradient-orb absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#ff3366] blur-[200px] opacity-0" />

      {/* Subtitle top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-[#00ff88] text-xs md:text-sm font-mono tracking-[0.4em] uppercase mb-8"
      >
        Portfolio — 2024
      </motion.div>

      {/* Main Name */}
      <div className="text-center">
        <h1 className="text-[clamp(2rem,8vw,8rem)] font-bold leading-[0.9] tracking-tight">
          {name.split("").map((char, i) => (
            <MagneticLetter key={i} char={char} index={i} />
          ))}
        </h1>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="mt-8 text-white/50 text-sm md:text-lg tracking-[0.1em] text-center max-w-xl"
      >
        Motion & Graphics Designer{" "}
        <span className="text-[#00ff88]">|</span> Crafting Fluid Brand Stories
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#00ff88] to-transparent"
        />
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 text-[10px] font-mono text-white/40 tracking-widest hidden md:block"
      >
        <div>BASED IN</div>
        <div className="text-[#00ff88]">INDIA</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 right-8 text-[10px] font-mono text-white/40 tracking-widest text-right hidden md:block"
      >
        <div>MOTION</div>
        <div className="text-[#00ff88]">DESIGN</div>
      </motion.div>
    </section>
  );
}