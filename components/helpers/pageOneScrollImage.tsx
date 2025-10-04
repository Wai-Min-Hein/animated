"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageOverlap from "../ImageOverlap";

gsap.registerPlugin(ScrollTrigger);

const ScrollImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images = containerRef.current?.children;
    if (!images) return;

    gsap.to(images, {
      x: (i: number) => `${100 + i * 10}vw`, // increase x slightly per image
      y: (i: number) => `${100 + i * 80}vh`, // increase y more per image
      scale: .1,
      ease: "power1.inOut",
      stagger: {
        each: 0.1,
        from: "start", // can be 'start', 'center', 'end', or an index
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true
      },
    });
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", height: "100vh" }}>
      <ImageOverlap />
    </div>
  );
};

export default ScrollImages;
