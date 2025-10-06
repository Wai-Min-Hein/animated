"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedImageProps {
  top: number;
  left: number;
  zIndex?: number;
  src: string;
  isCenter?: boolean;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  top,
  left,
  zIndex = 1000,
  src,
  isCenter=false
}) => {
  const imgWidth = 800;
  const imgHeight = 900;

  const bounceRef = useRef<HTMLDivElement>(null); // For bounce/yoyo

  useGSAP(() => {
    if (!bounceRef.current) return;

    // 1. Continuous bounce/yoyo on the child
    gsap.to(bounceRef.current, {
      y: 40,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.4 + Math.random() * 0.5,
    });
  });


  return (
    <div
      ref={bounceRef}
      className={`absolute w-[500px] h-[450px] md:w-[600px] md:h-[500px] lg:w-[800px] lg:h-[900px] ${isCenter ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999]" : ""} ${isCenter ? "" : ""}`}

      style={{
        // width: `${imgWidth}px`,
        // height: `${imgHeight}px`,
        zIndex,
        willChange: "transform",
      }}
    >
      <Image
        src={src}
        width={imgWidth}
        height={imgHeight}
        // fill
        style={{ objectFit: "cover", objectPosition: "top" }}
        alt="Human"
        priority
      />
    </div>
  );
};

export default AnimatedImage;
