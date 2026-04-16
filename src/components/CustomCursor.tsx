"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hoverType, setHoverType] = useState<"default" | "link" | "project" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='project']")) {
        setHoverType("project");
      } else if (target.closest("a, button, [data-cursor='link']")) {
        setHoverType("link");
      } else if (target.closest("h1, h2, h3, p, [data-cursor='text']")) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  const sizes = {
    default: 16,
    link: 48,
    project: 80,
    text: 4,
  };

  const size = sizes[hoverType];

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="custom-cursor rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          backgroundColor: hoverType === "project" ? "transparent" : "#00ff88",
          border: hoverType === "project" ? "2px solid #00ff88" : "none",
        }}
        animate={{
          width: size,
          height: size,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {hoverType === "project" && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#00ff88] uppercase tracking-widest">
            View
          </span>
        )}
      </motion.div>
      {/* Dot cursor */}
      <motion.div
        className="custom-cursor rounded-full bg-[#00ff88]"
        style={{
          x: cursorX,
          y: cursorY,
          width: 4,
          height: 4,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && hoverType !== "text" ? 1 : 0,
        }}
      />
    </>
  );
}