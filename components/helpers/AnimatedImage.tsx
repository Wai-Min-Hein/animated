// // "use client";

// // import Image from "next/image";
// // import React, { useRef } from "react";

// // import gsap from "gsap";
// // import { useGSAP } from "@gsap/react";
// // gsap.registerPlugin(useGSAP);

// // interface AnimatedImageProps {
// //   top: number;
// //   left: number;
// //   zIndex?: number;
// //   src: string;
// // }

// // const AnimatedImage: React.FC<AnimatedImageProps> = ({
// //   top,
// //   left,
// //   zIndex = 1000,
// //   src,
// // }) => {
// //   const imgWidth = 800;
// //   const imgHeight = 900;

// //   const imgRef = useRef<HTMLDivElement>(null);

// //   // Using useGSAP hook for GSAP animations
// //   useGSAP(() => {
// //     gsap.to(imgRef.current, {
// //       y: 40,
// //       ease: "power1.inOut",
// //       repeat: -1,
// //       yoyo: true,
// //       duration: 0.4 + Math.random() * 0.5,
// //       force3D: true,
// //     });
// //   });

// //   return (
// //     <div
// //       className="absolute"
// //       ref={imgRef}
// //       style={{
// //         top: `${top}px`,
// //         left: `${left}px`,
// //         width: `${imgWidth}px`,
// //         height: `${imgHeight}px`,
// //         zIndex,
// //         willChange: 'transform',
// //       }}
// //     >
// //       <Image
// //         src={src}
// //         width={imgWidth}
// //         height={imgHeight}
// //         style={{ objectFit: "cover", objectPosition: "top" }}
// //         alt={`Human`}
// //       />
// //     </div>
// //   );
// // };

// // export default AnimatedImage;

// "use client";

// import Image from "next/image";
// import React, { useRef } from "react";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register ScrollTrigger, as it's not automatically registered with useGSAP
// gsap.registerPlugin(useGSAP, ScrollTrigger);

// interface AnimatedImageProps {
//   top: number;
//   left: number;
//   zIndex?: number;
//   src: string;
//   // Prop to pass the ref of the main scroll container
// }

// const AnimatedImage: React.FC<AnimatedImageProps> = ({
//   top,
//   left,
//   zIndex = 1000,
//   src,
// }) => {
//   const imgWidth = 800;
//   const imgHeight = 900;

//   const imgRef = useRef<HTMLDivElement>(null);
//   const scrollTriggerContainerRef = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const imgElement = imgRef.current;
//     if (!imgElement || !scrollTriggerContainerRef.current) return;

//     // 1. Independent Floating Animation (Bounce/Yoyo)
//     // This animation runs continuously.
//     gsap.to(imgElement, {
//       y: 40,
//       ease: "power1.inOut",
//       repeat: -1,
//       yoyo: true,
//       duration: 0.4 + Math.random() * 0.5,
//       // Fix for flickering: Use will-change in CSS or ensure GPU acceleration
//       // force3D: true, is included by default with modern GSAP transforms
//     });

//     // 2. ScrollTrigger Animation (Shrink and Move)
//     // This animation takes over the x, y (translation) and scale properties during scroll.
//     gsap.to(imgElement, {
//       x: "80vw",    // Move right toward the corner
//       y: "80vh",    // Move down toward the corner
//       scale: 0.1,   // Shrink to 10% of original size
//       ease: "power1.out",
//       scrollTrigger: {
//         // The trigger is the main scroll container (from the parent component)
//         trigger: scrollTriggerContainerRef.current,
//         // Start when the top of the container hits the top of the viewport
//         start: "top top",
//         // End when the bottom of the container hits the top of the viewport
//         end: "bottom top",
//         // Links scroll position to animation progress
//         scrub: true,
//       },
//     });
//   }, { scope: imgRef, dependencies: [scrollTriggerContainerRef] });

//   return (
//     <div
//       className="absolute"
//       ref={imgRef}
//       style={{
//         top: `${top}px`,
//         left: `${left}px`,
//         width: `${imgWidth}px`,
//         height: `${imgHeight}px`,
//         zIndex,
//         // Recommended fix for flicker/jitter
//         willChange: 'transform',
//       }}
//     >

//       <Image
//         src={src}
//         width={imgWidth}
//         height={imgHeight}
//         style={{ objectFit: "cover", objectPosition: "top" }}
//         alt={`Human`}
//         priority // Added for better loading performance
//       />
//     </div>
//   );
// };

// export default AnimatedImage;

"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedImageProps {
  top: number;
  left: number;
  zIndex?: number;
  src: string;
  isCenter?: boolean;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  top,
  left,
  zIndex = 1000,
  src,
  isCenter=false
}) => {
  const imgWidth = 800;
  const imgHeight = 900;

  const bounceRef = useRef<HTMLDivElement>(null); // For bounce/yoyo

  useGSAP(() => {
    if (!bounceRef.current) return;

    // 1. Continuous bounce/yoyo on the child
    gsap.to(bounceRef.current, {
      y: 40,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.4 + Math.random() * 0.5,
    });
  });

  return (
    <div
      ref={bounceRef}
      className={`absolute ${isCenter ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999]" : ""} ${isCenter ? "" : ""}`}

      style={{
        // top: `${top}px`,
        // left: `${left}px`,
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
        zIndex,
        willChange: "transform",
      }}
    >
      <Image
        src={src}
        width={imgWidth}
        height={imgHeight}
        style={{ objectFit: "cover", objectPosition: "top" }}
        alt="Human"
        priority
      />
    </div>
  );
};

export default AnimatedImage;
