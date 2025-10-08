"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MainPage from "@/components/pages/MainPage";
import BubbleAnimation from "@/components/BubbleAnimation";
import { Observer } from "gsap/Observer";
import Collection from "@/components/helpers/Collection";

gsap.registerPlugin(ScrollTrigger, Observer);

const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSectionThreeActive, setIsSectionThreeActive] = useState(false);

  const [activeSection, setActiveSection] = useState(1); // 1 = sectionOne, 2 = sectionTwo, etc.
  const animating = useRef(false);

  const updateSection = (newSection: number) => {
    animating.current = true;
    setActiveSection(newSection);

    setIsSectionThreeActive(newSection == 3);

    // unlock after animation duration
    setTimeout(() => (animating.current = false), 800);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onUp: () => {
        if (!animating.current) {
          // scroll up → next section
          updateSection(activeSection === 3 ? 3 : activeSection + 1);
        }
      },
      onDown: () => {
        if (!animating.current) {
          // scroll down → previous section
          updateSection(activeSection === 1 ? 1 : activeSection - 1);
        }
      },
    });

    return () => observer.kill();
  }, [activeSection]);

  return (
    <main
    className={`relative overflow-hidden h-screen`} 
    
    ref={sectionRef}>
      <BubbleAnimation isRightToLeft={isSectionThreeActive} />

      <MainPage activeSection={activeSection} />

     

      <Collection />
    </main>
  );
};

export default Home;


