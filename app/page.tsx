"use client";
import PageOne from "@/components/pages/pageOne";
import PageTwo from "@/components/pages/pageTwo";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import PageThree from "@/components/pages/pageThree";


gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bubbles = Array.from({ length: 8 });

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".section");

    // Snap scroll to sections
    // ScrollTrigger.create({
    //   snap: {
    //     snapTo: 1 / (sections.length - 1), // equally divide scroll into sections
    //     duration: 1.5, // smooth snap
    //     ease: "power1.inOut",
    //   },
    // });

    if (!sectionRef.current) return;

    // Bubble animations
    const bubbleElements = sectionRef.current.querySelectorAll(".bubble");

    bubbleElements.forEach((bubble) => {
      const duration = 1.75 + Math.random() * 0.5; // random speed
      const delay = Math.random() * 2; // random start delay
      const xMove = (Math.random() - 0.5) * 50; // horizontal drift

      gsap.to(bubble, {
        y: "-200vh", // float to top
        x: `+=${xMove}`,
        duration,
        delay,
        repeat: -1, // infinite
        ease: "linear",
        modifiers: {
          y: (y) => {
            // reset bubble to bottom after leaving top
            if (parseFloat(y) < -1200) return "100vh";
            return y;
          },
        },
      });
    });
  });

  return (
    <main className="relative overflow-hidden" ref={sectionRef}>
      <PageOne />
      <PageTwo />
      <PageThree />

      {bubbles.map((_, i) => {
        const left = Math.random() * 90;
        const size = 200 + Math.random() * 40;

        return (
          <div
            key={i}
            className="bubble absolute bottom-[-100px] z-[-1]"
            style={{ left: `${left}%` }}
          >
            <Image
              src="/collection.svg"
              width={size}
              height={size}
              alt="Bubble"
            />
          </div>
        );
      })}
    </main>
  );
};

export default Home;


