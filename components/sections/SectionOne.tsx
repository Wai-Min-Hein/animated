"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/image";
import AnimatedImage from "../helpers/AnimatedImage";
import { leftPositions, offset, rows, rowTops } from "@/common/imageRow";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  activeSection: number;
}

const SectionOne: React.FC<SectionProps> = ({
  sectionRef,
  activeSection,
}) => {
  const logoRef = useRef<HTMLImageElement>(null);

    const centerImageRef = useRef<HTMLDivElement>(null);
    const sideImageRefs = useRef<HTMLDivElement[]>([]);
    sideImageRefs.current = [];
  
    // Create timeline ref
    const tlRef = useRef<GSAPTimeline | null>(null);
  

  useEffect(() => {
    if (!sectionRef.current || !centerImageRef.current) return;

    // logo fade effect animation
    if (logoRef.current) {
      if (activeSection === 1) {
        // fade in when returning home
        gsap.to(logoRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          // delay:.4
        });
      } else {
        // fade out when leaving home
        gsap.to(logoRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          // delay:.4
        });
      }
    }


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
        duration: 0.4,
        ease: "power2.in",
      });

      // Center image animation for activeSection 2
      tl.addLabel("section2").to(centerImageRef.current, {
        x: "-=20vw",
        y:'+=10vh',
        scale: 0.3,
        rotation: -90,
        duration: .6,
      });

      // Center image animation for activeSection 3
      tl.addLabel("section2").to(centerImageRef.current, {
        x: "-=5vw",
        y: "-=10vh", // move up
        scale: 0.3,
        rotation: 0,
        duration: .6,
      });

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
  }, [activeSection,sectionRef,centerImageRef]);
  return (
    <>
      <Image
        ref={logoRef}
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
                  zIndex: 9999,
                }}
              >
                <AnimatedImage isCenter={isCenter} src={src} top={0} left={0} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default SectionOne;
