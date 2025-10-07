// "use client";

// import React, { useRef, useMemo } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// interface BubbleAnimationProps {
//   isRightToLeft: boolean;
// }

// const NUM_BUBBLES = 20;

// const BubbleAnimation: React.FC<BubbleAnimationProps> = ({ isRightToLeft }) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const bubbleProps = useMemo(() => {
//     return Array.from({ length: NUM_BUBBLES }).map(() => ({
//       size: gsap.utils.random(20, 80),
//       startX: gsap.utils.random(0, 100, 1) + "%",
//       duration: gsap.utils.random(8, 16),
//       driftX: gsap.utils.random(-40, 40),
//       delay: gsap.utils.random(-10, 0),
//       phase: gsap.utils.random(0, Math.PI * 2), 
//     }));
//   }, []);

//   useGSAP(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const bubbles = gsap.utils.toArray<HTMLElement>(container.children);
    
//     // 1. Initial Setup and Styling (Runs once)
//     bubbles.forEach((bubble, i) => {
//       const { size, startX } = bubbleProps[i];
//       gsap.set(bubble, {
//         width: size,
//         height: size,
//         left: startX,
//         y: gsap.utils.random(0, 100, 1) + "vh",
//         // scale: 0,
//         background: `rgba(173, 216, 230, ${gsap.utils.random(0.3, 0.6)})`,
//         borderRadius: "50%",
//         boxShadow: "0 0 10px rgba(173, 216, 230, 0.8)",
//       });
//     });

//     // 2. Dynamic Animation Logic (Runs on mount and when isRightToLeft changes)
//     bubbles.forEach((bubble, i) => {
//       const { duration, driftX, delay, phase } = bubbleProps[i];
      
//       // IMPORTANT: DO NOT kill the tween. Let the new tween overwrite the old one.
//       // gsap.killTweensOf(bubble); // <-- REMOVED

//       if (isRightToLeft) {
//         // --- Continuous Right-to-Left Animation ---
//         gsap.to(bubble, {
//           // New properties to transition to
//           x: "-=100vw", // Change direction to predominantly horizontal movement
//           scale: 1.1,
//           opacity: 1,

//           // Control properties
//           duration: duration * 1,
//           delay: delay,
//           repeat: -1,
//           ease: "none",
//           overwrite: true, // Crucial for a smooth takeover

//           // Modifiers for continuous loop and sine wave float
//           modifiers: {
//             x: (x) => {
//               const wrapAmount = 100; // 100vw
//               const newX = parseFloat(x) % (wrapAmount * 2);
//               if (newX < -wrapAmount) {
//                 // If it goes off the left, reset it to the right
//                 return `${newX + wrapAmount * 2}vw`;
//               }
//               return x;
//             },
//             y: (y) => {
//                 // Sine wave movement for vertical float while moving left
//                 const floatAmount = Math.sin(gsap.ticker.time * 0.5 + phase) * 5;
//                 return `${parseFloat(y) + floatAmount}px`;
//             }
//           }
//         });
//       } else {
//         // --- Continuous Upward Float Animation (Default) ---
//         gsap.to(bubble, {
//           // New properties to transition to
//           y: "-=200vh", // Change direction to predominantly vertical movement
//           x: driftX,    // Revert to base horizontal drift
//           scale: 1.1,
//           opacity: 1,

//           // Control properties
//           duration: duration,
//           delay: delay,
//           repeat: -1,
//           ease: "none",
//           overwrite: true, // Crucial for a smooth takeover

//           // Modifiers for continuous loop and sine wave drift
//           modifiers: {
//             y: (y) => {
//               const wrapAmount = 100; // 100vh
//               const newY = parseFloat(y) % (wrapAmount * 2);
//               if (newY < -wrapAmount) {
//                 // If it goes off the top, reset it to the bottom
//                 return `${newY + wrapAmount * 2}vh`;
//               }
//               return y;
//             },
//             x: (x) => {
//                 // Sine wave movement for horizontal drift while moving up
//                 const driftAmount = Math.sin(gsap.ticker.time + phase) * 10;
//                 return `${parseFloat(x) + driftAmount}px`;
//             }
//           }
//         });
//       }
//     });
    
//   }, [isRightToLeft, bubbleProps]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]"
//     >
//       {Array.from({ length: NUM_BUBBLES }).map((_, i) => (
//         <div key={i} className="absolute" />
//       ))}
//     </div>
//   );
// };

// export default BubbleAnimation;

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
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]"
    >
      {Array.from({ length: NUM_BUBBLES }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
};

export default BubbleAnimation;
