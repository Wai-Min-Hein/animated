"use client";

import React, { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";

interface BubbleAnimationProps {
  isRightToLeft: boolean;
}

const NUM_BUBBLES = 20;

const BubbleAnimation: React.FC<BubbleAnimationProps> = ({ isRightToLeft }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleProps = useMemo(() => {
    return Array.from({ length: NUM_BUBBLES }).map(() => ({
      size: gsap.utils.random(20, 80),
      startX: gsap.utils.random(0, 100, 1) + "%",
      startY: gsap.utils.random(0, 100, 1) + "vh",
      driftX: gsap.utils.random(-40, 40),
      duration: gsap.utils.random(8, 16),
      phase: gsap.utils.random(0, Math.PI * 2),
      speed: gsap.utils.random(0.2, 0.6),
    }));
  }, []);

  const directionRef = useRef(isRightToLeft);
  const bubblesRef = useRef<HTMLElement[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bubbles = gsap.utils.toArray<HTMLElement>(container.children);
    bubblesRef.current = bubbles;

    bubbles.forEach((bubble, i) => {
      const { size, startX, startY } = bubbleProps[i];
      gsap.set(bubble, {
        width: size,
        height: size,
        left: startX,
        top: startY,
        background: `rgba(173, 216, 230, ${gsap.utils.random(0.3, 0.6)})`,
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(173, 216, 230, 0.8)",
        position: "absolute",
      });

      // Initialize position data
      positionsRef.current[i] = { x: parseFloat(startX), y: parseFloat(startY) };
    });

    // GSAP ticker animation (runs every frame)
    const update = () => {
      bubbles.forEach((bubble, i) => {
        const props = bubbleProps[i];
        const pos = positionsRef.current[i];

        // Change direction smoothly based on toggle
        const dir = directionRef.current ? -1 : 1;

        // Horizontal or vertical movement
        if (directionRef.current) {
          pos.x += dir * props.speed; // move left
          pos.y += Math.sin(gsap.ticker.time * 0.5 + props.phase) * 0.3;
        } else {
          pos.y -= props.speed; // move upward
          pos.x += Math.sin(gsap.ticker.time + props.phase) * 0.2;
        }

        // Wrapping around screen edges
        if (pos.x < -10) pos.x = 110;
        if (pos.x > 110) pos.x = -10;
        if (pos.y < -10) pos.y = 110;
        if (pos.y > 110) pos.y = -10;

        gsap.set(bubble, { left: `${pos.x}vw`, top: `${pos.y}vh` });
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [bubbleProps]);

  // ✅ When toggle changes, only update directionRef (no new tweens)
  useEffect(() => {
    directionRef.current = isRightToLeft;
  }, [isRightToLeft]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[100]"
    >
      {Array.from({ length: NUM_BUBBLES }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
};

export default BubbleAnimation;
