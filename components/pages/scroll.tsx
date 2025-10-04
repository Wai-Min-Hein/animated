"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
gsap.registerPlugin(useGSAP);

export default function Scroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Using useGSAP hook for GSAP animations
  useGSAP(() => {
    if (!sectionRef.current || !boxRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(boxRef.current, {
      x: () =>
        (sectionRef.current!.offsetWidth - boxRef.current!.offsetWidth) / 1,
      y: () =>
        (sectionRef.current!.offsetHeight - boxRef.current!.offsetHeight) / 1,
      ease: "power1.inOut",
      scale: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // animation starts when section enters viewport
        end: "bottom top", // animation ends when section leaves viewport
        scrub: true,
        // markers: true, // uncomment to debug
      },
    });
  });

  return (
    <div>
      <div
        ref={sectionRef}
        // className="grid place-items-center"
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          background: "lightblue",
        }}
      >
        <div
          ref={boxRef}
          style={{
            width: "100px",
            height: "100px",
            background: "darkblue",
            // position: "absolute",
            // top: 0,
            // left: 0,
          }}
        >
          Animated Box
        </div>
      </div>
      <div className="h-screen w-screen bg-red-100"></div>
    </div>
  );
}
