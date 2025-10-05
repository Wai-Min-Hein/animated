"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { offset } from "../ImageOverlap";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]); // array of refs

  useGSAP(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    boxesRef.current.forEach((box) => {
      if (!box) return;

      // Section dimensions
      const sectionRect = section.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      // current absolute position of box inside section
      const startX = box.offsetLeft;
      const startY = box.offsetTop;

      // target absolute position (bottom-right corner)
      const targetX = sectionRect.width - boxRect.width;
      const targetY = sectionRect.height - boxRect.height;

      // GSAP needs the delta (target - current)
      const endX = targetX - startX;
      const endY = targetY - startY;

      // Scroll movement (all boxes reach bottom-right corner together)
      gsap.to(box, {
        x: "90vw",
        y: "80vh",
        ease: "power1.inOut",
        scale: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const bouncePercent = Math.min(40, (40 * 100) / box.offsetHeight);
      // Infinite bounce (independent)
      gsap.to(box, {
        yPercent: bouncePercent,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        duration: 0.4 + Math.random() * 0.5,
      });
    });
  });

  const rowTops = [
    offset(-300, 80), // Row 1
    offset(-100, 80), // Row 2
    offset(150, 80), // Row 3
    offset(400, 80), // Row 4
    offset(700, 80), // Row 5
    offset(1000, 80), // Row 6
  ];

  const rowLefts = [
    offset(100, 80), // Col 1
    offset(400, 80), // Col 2
    offset(700, 80), // Col 3
    offset(1000, 80), // Col 4
    offset(1300, 80), // Col 5
    offset(1600, 80), // Col 6
  ];
  const imgWidth = 800;
  const imgHeight = 900;
  return (
    <div>
      <div
        ref={sectionRef}
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          background: "lightblue",
          overflow: "hidden",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            style={{
              width: `${imgWidth}px`,
              height: `${imgHeight}px`,
              willChange: "transform",
              // background: i % 2 === 0 ? "darkblue" : "red",
              position: "absolute",
              top: rowTops[i % rowTops.length],
              left: rowLefts[i % rowLefts.length],
            }}
          >
            <Image
              key={i}
              ref={(el) => {
                if (el) boxesRef.current[i] = el;
              }}
              src="/human/img11.webp"
              width={imgWidth}
              height={imgHeight}
              style={{ objectFit: "cover", objectPosition: "top" }}
              alt="Human"
              priority
            />
          </div>
        ))}
      </div>
      <div className="h-screen w-screen bg-red-100"></div>
    </div>
  );
}
