
"use client";

// import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalBubbles from "../helpers/HorizontalBulbbles";

gsap.registerPlugin(ScrollTrigger);

const SectionThree=() => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const targetRef = useRef<HTMLDivElement>(null);

//  useEffect(() => {
//   if (!containerRef.current || !targetRef.current) return;

//   const tl = gsap.to(targetRef.current, {
//     duration: 3,
//     clipPath: "polygon(-100% 0%, 100% 0%, 100% 100%, -25% 100%)",
//     ease: "none",
//     scrollTrigger: {
//       trigger: containerRef.current,
//       start: "top top",
//       end: "+=1000",
//       pin: true,
//       scrub: 1,
//     },
//   });

//   return () => {
//     tl.scrollTrigger?.kill();
//     tl.kill();
//   };
// }, []);


  return (
    <div
    //   ref={containerRef}
      className="relative top-0 left-0 w-full h-full flex justify-center items-center bg-black overflow-hidden threeeeeee"
    >
     
       <>
      {Array.from({ length: 10 }).map((_, i) => {
        return <HorizontalBubbles key={i}   />;
      })}
    </>
    </div>
  );
}

export default SectionThree