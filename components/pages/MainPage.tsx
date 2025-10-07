"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import SectionOne from "../sections/SectionOne";
import SectionThree from "../sections/SectionThree";

gsap.registerPlugin(ScrollTrigger, Observer);

interface MainPageProps {
  activeSection: number;
}

const MainPage: React.FC<MainPageProps> = ({ activeSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const sideImageRefs = useRef<HTMLDivElement[]>([]);
  sideImageRefs.current = [];

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
        duration: 0.4,
        ease: "power2.in",
      });

      // Center image animation for activeSection 2
      tl.addLabel("section2").to(centerImageRef.current, {
        x: "-=25vw",
        scale: 0.3,
        rotation: -90,
        duration: 1,
      });

      // Center image animation for activeSection 3
      tl.addLabel("section2").to(centerImageRef.current, {
        x: "-=5vw",
        y: "-=10vh", // move up
        scale: 0.3,
        rotation: 0,
        duration: 1,
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
  }, [activeSection]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-screen min-h-screen max-h-screen h-screen section ${
        activeSection == 3 ? "" : ""
      }`}
    >
      <SectionOne
        centerImageRef={centerImageRef}
        sideImageRefs={sideImageRefs}
      />

      {activeSection == 3 && <SectionThree />}
    </div>
  );
};

export default MainPage;
