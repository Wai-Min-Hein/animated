"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimatedImage from "../helpers/AnimatedImage";

gsap.registerPlugin(ScrollTrigger);

export const offset = (value: number, range: number = 60) =>
  value + Math.floor(Math.random() * range - range / 2);

const PageOne = () => {
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

      // Phase II: Scroll-triggered exit
      const targetsForExit = sideImageRefs.current.filter(
        (el) => el !== centerImageRef.current
      );

      const tl_scroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=100vh",
          end: "bottom top",
          pin: true,
          scrub: 1,
        },
      });

      tl_scroll.to(targetsForExit, {
        x: "150vw",
        y: "80vh",
        stagger: { amount: 0.6, from: "end" },// animate one after another
        duration: 1,
        ease: "power2.in",
      });

      // Center image exit
      tl_scroll.to(
        centerImageRef.current,
        {
          rotation: -90,
          scale: 0.3,

          y: "+=100vh",
          duration: .5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1, // smooth follow scroll
          },
        },
        ">"
      );

      
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen section snap-start"
    >
      <Image
        width={368}
        height={72}
        src="/logo.svg"
        alt="Logo"
        className="absolute top-4 left-4 z-[99999]"
      />
      <h1 className="absolute top-20 left-4 text-white font-bold">Home</h1>
      <div className="w-full h-full absolute top-0 ">
        {rows.map((images, rowIndex) =>
          images.map((src, colIndex) => {
            // Make the center image the specific one
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
                // className={`${isCenter?'':'hidden'}`}
                className={`absolute ${
                  isCenter
                    ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    : ""
                } ${isCenter ? "" : ""}`}
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
