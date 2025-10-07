"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimatedImage from "../helpers/AnimatedImage";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

export const offset = (value: number, range: number = 60) =>
  value + Math.floor(Math.random() * range - range / 2);

interface PageOneProps {
  activeSection: number;
}

const PageOne: React.FC<PageOneProps> = ({ activeSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const sideImageRefs = useRef<HTMLDivElement[]>([]);
  sideImageRefs.current = [];

  // Row Y positions
  const rowTops = [-300, -100, 150, 400, 700, 1000].map((top) =>
    offset(top, 80)
  );

  // Images for each row
  const rows = [
    [
      "/human/img11.webp",
      "/human/img12.webp",
      "/human/img13.webp",
      "/human/img14.webp",
      "/human/img15.webp",
    ],
    [
      "/human/img6.webp",
      "/human/img7.webp",
      "/human/img8.webp",
      "/human/img9.webp",
      "/human/img10.webp",
    ],
    [
      "/human/img16.webp",
      "/human/img12.webp",
      "/human/human.webp",
      "/human/img11.webp",
      "/human/img7.webp",
    ],
    [
      "/human/img1.webp",
      "/human/img2.webp",
      "/human/img8.webp",
      "/human/img4.webp",
      "/human/img5.webp",
    ],
    [
      "/human/img6.webp",
      "/human/img7.webp",
      "/human/img8.webp",
      "/human/img9.webp",
      "/human/img10.webp",
    ],
    [
      "/human/img11.webp",
      "/human/img12.webp",
      "/human/img13.webp",
      "/human/img14.webp",
      "/human/img15.webp",
    ],
  ];

  const leftPositions = [-250, 0, 250, 500, 900];

  // Create timeline ref
  const tlRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
  if (!sectionRef.current || !centerImageRef.current) return;

  // Create timeline only once
  if (!tlRef.current) {
    const targetsForExit = sideImageRefs.current.filter(
      (el) => el !== centerImageRef.current
    );

    const tl = gsap.timeline({ paused: true });

    // Side images exit animation
    tl.to(targetsForExit, {
      x: "200vw",
      y: "60vh",
      stagger: { amount: 0.3, from: "end" },
      duration: .4,
      ease: "power2.in",
    });

    // Center image animation for activeSection 2
    tl.addLabel("section2")
      .to(centerImageRef.current, {
        x: "-=25vw",
        scale: 0.3,
        rotation: -90,
        duration: 1,
      });

    // Center image animation for activeSection 3
   tl.addLabel("section2")
  .to(centerImageRef.current, {
    x: "-=5vw",
    y: "-=10vh", // move up
    scale: 0.3,
    rotation: 0,
    duration: 1,
  })
  


    tlRef.current = tl;
  }

  
  // Control timeline based on activeSection
  if (activeSection === 1) {
    tlRef.current.reverse();
  } else if (activeSection === 2) {
    tlRef.current.tweenTo("section2"); // Go to section2 animation
  } else if (activeSection === 3) {
    tlRef.current.tweenTo("section3"); // Go to section3 animation
  }
}, [activeSection]);


  return (
    <div
      ref={sectionRef}
      id="section-one"
      className="relative w-screen min-h-screen max-h-screen h-screen section section-one"
    >
      <Image
        width={368}
        height={72}
        src="/logo.svg"
        alt="Logo"
        className="absolute top-4 left-4 z-[99999]"
      />
      <h1 className="absolute top-20 left-4 text-white font-bold">Home</h1>

      <div className="absolute top-0 left-0 w-full h-screen">
        {rows.map((images, rowIndex) =>
          images.map((src, colIndex) => {
            const isCenter = src === "/human/human.webp";
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                ref={(el) => {
                  if (!el) return;
                  if (isCenter) centerImageRef.current = el;
                  if (!sideImageRefs.current.includes(el))
                    sideImageRefs.current.push(el);
                }}
                style={{
                  top: isCenter ? "50%" : offset(rowTops[rowIndex]),
                  left: isCenter ? "50%" : offset(leftPositions[colIndex]),
                  transform: isCenter ? "translate(-50%, -50%)" : undefined,
                  position: "absolute",
                  willChange: "transform",
                }}
              >
                <AnimatedImage isCenter={isCenter} src={src} top={0} left={0} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PageOne;
