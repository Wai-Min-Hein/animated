"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const PageTwo = () => {
    // Original 16 images
  const baseImages = Array.from(
    { length: 16 },
    (_, i) => `/human/img${i + 1}.webp`
  );

  // Repeat to get 32 images

  const images = Array.from({ length: 32 }, (_, i) => baseImages[i % 16]);

  // Insert special image at a specific position, e.g., in the middle
  const specialIndex = Math.floor(images.length / 2) - 8;
  images[specialIndex] = "/human/human.webp";


  const bubbles = Array.from({ length: 8 });

  return (
  <section className="relative w-screen h-screen overflow-hidden grid place-items-center snap-start">
      {/* Human image */}
      <motion.div
        className="ro rotate-270 z-[9999]"
        style={{
          width: `300px`,
          height: `800px`,
          zIndex: "1000",
        }}
      >
        <Image
          src={"/human/human.webp"}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          alt={`Human`}
        />
      </motion.div>

      {/* Multiple floating bubbles */}
      {bubbles.map((_, i) => {
        const left = Math.random() * 90; // random horizontal position (0–90%)
        const duration = 4.5 + Math.random() * .8; 
        const delay = Math.random() * 2; // random delay to desync bubbles
        const size = 200 + Math.random() * 40; // bubble size (40–100px)

        return (
          <motion.div
            key={i}
            className="absolute bottom-[-100px] z-[100]"
            style={{ left: `${left}%` }}
            
            initial={{ y: "100vh",  }}
            animate={{ y: "-120vh" }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/collection.svg"
              width={size}
              height={size}
              alt="Bubble"
            />
          </motion.div>
        );
      })}

    </section>
  )
}

export default PageTwo