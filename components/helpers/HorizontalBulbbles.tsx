"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface HorizontalBubblesProps {
  size?: number;
  top?: number;
  src?: string;
  activeSection: number;
}

const HorizontalBubbles: React.FC<HorizontalBubblesProps> = ({
  size = 150,
  top,
  src = "/collection.svg",
  activeSection,
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!bubbleRef.current) return;

    const yMove = (Math.random() - 0.5) * 50;
    const duration = 3 + Math.random() * 3.5;
    const delay = Math.random() * 1.2;

    // Only create the moving animation once
    if (!animRef.current) {
      animRef.current = gsap.fromTo(
        bubbleRef.current,
        { x: "100vw", y: `+=${yMove}` },
        {
          x: `-100vw`,
          y: `+=${yMove}`,
          duration,
          delay,
          ease: "linear",
          repeat: -1,
        }
      );
    }

    // Handle fade in/out based on section
    if (activeSection === 3) {
      gsap.to(bubbleRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    } else {
      gsap.to(bubbleRef.current, {
        opacity: 0,
        duration: .5,
        ease: "power2.in",
      });
    }
  }, [activeSection]);

  const bubbleTop = top ?? Math.random() * 80;

  return (
    <div
      ref={bubbleRef}
      className="bubble absolute z-[100]"
      style={{ left: 0, top: `${bubbleTop}vh`, opacity: 0 }}
    >
      <Image src={src} width={size} height={size} alt="Horizontal Bubble" />
    </div>
  );
};

export default HorizontalBubbles;
