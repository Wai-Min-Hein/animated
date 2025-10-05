"use client";

import React, { useRef } from "react";
import AnimatedImage from "./helpers/AnimatedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const offset = (value: number, range: number = 60) =>
  value + Math.floor(Math.random() * range - range / 2);

const ImageOverlap = () => {
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
          end: "+3000",
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
    <div
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden "
    >
      <Image
        width={368}
        height={72}
        src="/logo.svg"
        alt="Logo"
        className="absolute top-4 left-4 z-[99999]"
      />
      <h1 className="absolute top-20 left-4 text-white font-bold">Home</h1>
      {rows.map((images, rowIndex) =>
        images.map((src, colIndex) => (
          <div
            className=""
            ref={(el) => {
              // Always store in sideImageRefs array (avoid duplicates)
              if (el && !sideImageRefs.current.includes(el))
                sideImageRefs.current.push(el);
            }}
            key={`${rowIndex}-${colIndex}`}
          >
            <AnimatedImage
              top={offset(rowTops[rowIndex])}
              left={offset(leftPositions[colIndex])}
              src={src}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageOverlap;
