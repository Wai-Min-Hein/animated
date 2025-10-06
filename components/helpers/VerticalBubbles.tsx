// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import gsap from "gsap";

// interface VerticalBubblesProps {
//   size?: number;
//   left?: number;
//   src?: string;
// }

// const VerticalBubbles: React.FC<VerticalBubblesProps> = ({ size = 200, left, src = "/collection.svg" }) => {
//   const bubbleRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!bubbleRef.current) return;

//     const duration = 1.75 + Math.random() * 0.5;
//     const delay = Math.random() * 2;
//     const xMove = (Math.random() - 0.5) * 50;

//     gsap.to(bubbleRef.current, {
//       y: "-200vh",
//       x: `+=${xMove}`,
//       duration,
//       delay,
//       repeat: -1,
//       ease: "linear",
//       modifiers: {
//         y: (y) => (parseFloat(y) < -1200 ? "100vh" : y),
//       },
//     });
//   }, []);

//   const bubbleLeft = left ?? Math.random() * 90;

//   return (
//     <div
//       ref={bubbleRef}
//       className="bubble absolute bottom-[-100px] z-[-1]"
//       style={{ left: `${bubbleLeft}%` }}
//     >
//       <Image src={src} width={size} height={size} alt="Vertical Bubble" />
//     </div>
//   );
// };

// export default VerticalBubbles;



"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface VerticalBubblesProps {
  size?: number;
  left?: number;
  src?: string;
}

const VerticalBubbles: React.FC<VerticalBubblesProps> = ({ size = 200, left, src = "/collection.svg" }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!bubbleRef.current) return;
    parentRef.current = bubbleRef.current.parentElement;

    const duration = 1.75 + Math.random() * 0.5;
    const delay = Math.random() * 2;
    const xMove = (Math.random() - 0.5) * 50;

    gsap.to(bubbleRef.current, {
      y: "-200vh",
      x: `+=${xMove}`,
      duration,
      delay,
      repeat: -1,
      ease: "linear",
      modifiers: {
        y: (y) => {
          const yPos = parseFloat(y);
          // Reset bubble if above top
          if (yPos < -bubbleRef.current!.offsetHeight) return "0px";

          // Check if bubble is inside parent section
          if (parentRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            const bubbleRect = bubbleRef.current!.getBoundingClientRect();
            if (
              bubbleRect.bottom < parentRect.top || // above parent
              bubbleRect.top > parentRect.bottom // below parent
            ) {
              bubbleRef.current!.style.opacity = "0";
            } else {
              bubbleRef.current!.style.opacity = "1";
            }
          }

          return y;
        },
      },
    });
  }, []);

  const bubbleLeft = left ?? Math.random() * 90;

  return (
    <div
      ref={bubbleRef}
      className="bubble absolute z-[-1]"
      style={{ left: `${bubbleLeft}%`, bottom: "0px", opacity: 0 }}
    >
      <Image src={src} width={size} height={size} alt="Vertical Bubble" />
    </div>
  );
};

export default VerticalBubbles;
