"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import SectionOne from "../sections/SectionOne";
import SectionThree from "../sections/SectionThree";
import SectionTwo from "../sections/SectionTwo";

gsap.registerPlugin(ScrollTrigger, Observer);

interface MainPageProps {
  activeSection: number;
}

const MainPage: React.FC<MainPageProps> = ({ activeSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className={`relative w-screen min-h-screen max-h-screen h-screen section ${
        activeSection == 3 ? "" : ""
      }`}
    >
      <SectionOne sectionRef={sectionRef} activeSection={activeSection} />
      <SectionTwo activeSection={activeSection} />

      <SectionThree activeSection={activeSection} />
    </div>
  );
};

export default MainPage;
