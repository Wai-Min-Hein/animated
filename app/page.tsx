"use client";
import PageOne from "@/components/pages/pageOne";
import PageTwo from "@/components/pages/pageTwo";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PageThree from "@/components/pages/pageThree";


gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".section");

    // Snap scroll to sections
    ScrollTrigger.create({
      snap: {
        snapTo: 1 / (sections.length - 1), // equally divide scroll into sections
        duration: .5, // smooth snap
        ease: "power1.inOut",
      },
    });
   
  });

  return (
    <main className="relative overflow-hidden" ref={sectionRef}>
      <PageOne />
      <PageTwo />
      <PageThree />


      


    </main>
  );
};

export default Home;


