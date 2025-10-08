"use client";

// import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  activeSection: number;
}

const SectionTwo: React.FC<SectionProps> = ({ activeSection }) => {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    
    // logo fade effect animation
    if (logoRef.current) {
      if (activeSection === 2) {
        // fade in
        gsap.to(logoRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 1,
        });
      } else {
        // fade out
        gsap.to(logoRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
          // delay:.4
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full grid place-items-center">
        <div className="relative w-[80vw] h-full grid place-items-center">
          <Image
            ref={logoRef}
            fill
            src="/logo.svg"
            alt="Logo"
            className={`z-[999] opacity-0  translate-y-[-10vh] ${
              activeSection == 2 ? "" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
