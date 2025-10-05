"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Side images data
// Your offset function
export const offset = (value: number, range: number = 60) =>
  value + Math.floor(Math.random() * range - range / 2);

// Define row and column positions
const rowTops = [
  offset(-500, 80), // Row 1
  offset(-400, 80), // Row 1
  offset(-300, 80), // Row 1
  offset(-100, 80), // Row 2
  offset(150, 80), // Row 3
  offset(400, 80), // Row 4
  offset(700, 80), // Row 5
  offset(1000, 80), // Row 6
];

const rowLefts = [
  offset(-200, 80), // Col 1
  offset(-100, 80), // Col 1
  offset(0, 80), // Col 1
  offset(100, 80), // Col 1
  offset(400, 80), // Col 2
  offset(700, 80), // Col 3
  offset(1000, 80), // Col 4
  offset(1300, 80), // Col 5
  offset(1600, 80), // Col 6
];

interface ImagePosition {
  id: number;
  top: string; // e.g., "150px" or "10vh"
  left: string; // e.g., "100px" or "5vw"
  width: number; // in px
  height: number; // in px
}

// Generate image positions dynamically (grid-like)
const imagePositions: ImagePosition[] = [];
rowTops.forEach((top) => {
  rowLefts.forEach((left) => {
    imagePositions.push({
      id: imagePositions.length + 1,
      top: `${top}px`,
      left: `${left}px`,
      width: 800,
      height: 900,
    });
  });
});

const centerImageIndex = 0; // e.g., the first image is the center

const centerImagePosition = {
  top: `50%`,
  left: `50%`,
  width: imagePositions[centerImageIndex].width,
  height: imagePositions[centerImageIndex].height,
};

// const centerImagePosition = { id: 5, top: "20vh", left: "45vw", size: 500, rotation: 0 };

const SectionOne = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Initialize as empty array
  const sideImageRefs = useRef<HTMLDivElement[]>([]);
  sideImageRefs.current = []; // reset on each render

  const centerImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // --- Phase I: Bounce animation ---
      const tl_bounce = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: false,
      });

      tl_bounce.to([...sideImageRefs.current, centerImageRef.current], {
        y: 15,
        //   rotation: 2,
        ease: "sine.inOut",
        duration: 1.5,
        stagger: 0.1,
      });

      // Phase II: Scroll-triggered exit
      // const targetsForExit = [...sideImageRefs.current].reverse();
      // const targetsForExit = [...sideImageRefs.current];

      // Phase II: Scroll-triggered exit
      const targetsForExit = sideImageRefs.current.filter(
        (el) => el !== centerImageRef.current
      );

      const tl_scroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
          onToggle: (self) => {
            if (self.isActive) {
              tl_bounce.pause();
            } else {
              tl_bounce.play();
            }
          },
          // markers: true,
        },
      });

      tl_scroll.to(targetsForExit, {
        x: "80vw",
        y: "80vh",
        scale: 0.1,
        opacity: 0,
        //   rotation: 30,
        stagger: { amount: 0.8, from: "end" },
        duration: 1.5,
        ease: "power2.in",
      });

      // Center image exit
      tl_scroll.to(
        centerImageRef.current,
        {
          rotation: -90,
          scale: 1,
          // opacity: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
        ">"
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="h-screen w-screen relative overflow-hidden">
      <div className="w-full h-screen sticky top-0 overflow-hidden">
        {imagePositions.map((img, index) => {
          const isCenter = index === centerImageIndex;
          return (
            <div
              key={img.id}
              ref={(el) => {
                if (!el) return;

                // Store center image in its own ref
                if (isCenter) centerImageRef.current = el;

                // Always store in sideImageRefs array (avoid duplicates)
                if (!sideImageRefs.current.includes(el))
                  sideImageRefs.current.push(el);
              }}
              style={{
                top: isCenter ? centerImagePosition.top : img.top,
                left: isCenter ? centerImagePosition.left : img.left,
                width: `${img.width}px`,
                height: `${img.height}px`,
                transform: isCenter ? "translate(-50%, -50%)" : undefined, // center the element
                willChange: "transform",
              }}
              className={`absolute ${isCenter ? "" : ""}`}
            >
              <Image
                src={isCenter ? "/human/human.webp" : "/human/img11.webp"}
                width={800}
                height={900}
                style={{ objectFit: "cover" }}
                alt={`Side Image ${img.id}`}
                priority
                className="w-full h-full"
              />
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default SectionOne;

// <div ref={sectionRef} className="h-screen w-screen relative">
//   <div className="w-full h-screen sticky top-0 overflow-hidden">
//     {imagePositions.map((img) => (
//       <div
//         key={img.id}
//         ref={(el) => { if (el) sideImageRefs.current.push(el); }}
//         style={{
//           top: img.top,
//           left: img.left,
//           width: `${img.width}px`,
//           height: `${img.height}px`,
//           willChange: "transform",
//         }}
//         className="absolute"
//       >
//         <Image
//           src="/human/img11.webp"
//           width={650}
//           height={800}
//           style={{ objectFit: "cover" }}
//           alt={`Side Image ${img.id}`}
//           priority
//           className="w-full h-full"
//         />
//       </div>
//     ))}

//     <div
//       ref={centerImageRef}
//       style={{
//         top: centerImagePosition.top,
//         left: centerImagePosition.left,
//         width: `${centerImagePosition.size}px`,
//         height: `${centerImagePosition.size * 1.23}px`,
//         willChange: "transform",
//       }}
//       className="absolute z-10"
//     >
//       <Image
//         src="/human/img11.webp"
//         width={650}
//         height={800}
//         style={{ objectFit: "cover" }}
//         alt="Center Image"
//         priority
//         className="w-full h-full"
//       />
//     </div>
//   </div>

//   <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
//     <h2 className="text-4xl">Next Section Content</h2>
//   </div>
// </div>
