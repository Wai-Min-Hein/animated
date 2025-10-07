
'use client'
import React from 'react'

import Image from "next/image";
import AnimatedImage from "../helpers/AnimatedImage";
import { leftPositions, offset, rows, rowTops } from "@/common/imageRow";
interface SectionProps {
  
  centerImageRef: React.RefObject<HTMLDivElement |null>; // pass ref from parent
  sideImageRefs: React.RefObject<HTMLDivElement[]>; // pass ref from parent
}

const SectionOne: React.FC<SectionProps> = ({
  centerImageRef,
  sideImageRefs,
}) => {
  return (
    <>
         <Image
                width={368}
                height={72}
                src="/logo.svg"
                alt="Logo"
                className="absolute top-4 left-4 z-[99999]"
              />
              <h1 className="absolute top-20 left-4 text-white font-bold">Home</h1>
        
              <div className="absolute top-0 left-0 w-full h-screen">
                {rows.map((images, rowIndex) =>
                  images.map((src, colIndex) => {
                    const isCenter = src === "/human/human.webp";
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        ref={(el) => {
                          if (!el) return;
                          if (isCenter) centerImageRef.current = el;
                          if (!sideImageRefs.current.includes(el))
                            sideImageRefs.current.push(el);
                        }}
                        style={{
                          top: isCenter ? "50%" : offset(rowTops[rowIndex]),
                          left: isCenter ? "50%" : offset(leftPositions[colIndex]),
                          transform: isCenter ? "translate(-50%, -50%)" : undefined,
                          position: "absolute",
                          willChange: "transform",
                          zIndex: 9999,
                        }}
                      >
                        <AnimatedImage isCenter={isCenter} src={src} top={0} left={0} />
                      </div>
                    );
                  })
                )}
              </div>
    </>
  )
}

export default SectionOne