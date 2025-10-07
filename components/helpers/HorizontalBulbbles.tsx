"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface HorizontalBubblesProps {
  size?: number;
  top?: number;
  src?: string;
}

const HorizontalBubbles: React.FC<HorizontalBubblesProps> = ({ size = 150, top, src = "/collection.svg" }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bubbleRef.current) return;

    const yMove = (Math.random() - 0.5) * 50; // small vertical drift
    const duration = 3 + Math.random() * 3.5; // speed variation
    const delay = Math.random() * 1.2;

    // Animate horizontally across the screen
    gsap.fromTo(
      bubbleRef.current,
      { x: '100vw', y: `+=${yMove}` }, // start at left border
      {
        x: `-100vw`, // move to right edge
        y: `+=${yMove}`,
        duration,
        delay,
        ease: "linear",
        repeat: -1,
      }
    );
  }, [size]);

  const bubbleTop = top ?? Math.random() * 80;

  return (
    <div
      ref={bubbleRef}
      className="bubble absolute z-[100]"
      style={{ left: 0, top: `${bubbleTop}vh` }} // left:0 ensures it starts at left border
    >
      <Image src={src} width={size} height={size} alt="Horizontal Bubble" />
    </div>
  );
};

export default HorizontalBubbles;
