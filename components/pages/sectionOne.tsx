// "use client";

// import Image from "next/image";
// import React from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(useGSAP, ScrollTrigger);
// const SectionOne = () => {
//   const imageRef = React.useRef<HTMLImageElement>(null); // For bounce/yoyo
//   const imageWrapperRef = React.useRef<HTMLDivElement>(null); // For bounce/yoyo
//   const sectionRef = React.useRef<HTMLDivElement>(null); // For bounce/yoyo

//   const imageRef2 = React.useRef<HTMLImageElement>(null); // For bounce/yoyo
//   const imageWrapperRef2 = React.useRef<HTMLDivElement>(null); // For bounce/yoyo

//   useGSAP(() => {
//     const section = sectionRef.current;
//     const image = imageRef.current;
//     const wrapper = imageWrapperRef.current;

//      const image2= imageRef2.current;
//     const wrapper2 = imageWrapperRef2.current;

//     if (!image || !section || !wrapper) return;

//     // 1. Continuous image/yoyo on the child
//     gsap.to(image, {
//       y: 40,
//       ease: "power1.inOut",
//       repeat: -1,
//       yoyo: true,
//       duration: 0.4 + Math.random() * 0.5,
//     });

//     gsap.to(imageWrapperRef.current, {
//       x: "100vw",
//       y: "100vh",
//       ease: "power1.inOut",
//       yoyo: true,
//       scale: 0.1,
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//       },
//     });

//      gsap.to(image2, {
//       y: 40,
//       ease: "power1.inOut",
//       repeat: -1,
//       yoyo: true,
//       duration: 0.4 + Math.random() * 0.5,
//     });

//     gsap.to(wrapper2, {
//       x: "100vw",
//       y: "100vh",
//       ease: "power1.inOut",
//       yoyo: true,
//       scale: 0.1,
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//       },
//     });
//   });

//   return (
//     <div ref={sectionRef} className="h-screen w-screen relative">
//       <div className="w-full h-full">
//         <div ref={imageWrapperRef} className="">
//           <Image
//             src="/human/img11.webp"
//             width={650}
//             height={800}
//             style={{
//               objectFit: "cover",
//               objectPosition: "top",
//               top: `${-30}px`,
//               left: `${-30}px`,
//               width: `${650}px`,
//               height: `${800}px`,
//               willChange: "transform",
//             }}
//             alt="Human"
//             priority
//             className="absolute"
//             ref={imageRef}
//           />
//         </div>

//         <div ref={imageWrapperRef2} className="">
//           <Image
//             src="/human/img11.webp"
//             width={650}
//             height={800}
//             style={{
//               objectFit: "cover",
//               objectPosition: "top",
//               top: `${-320}px`,
//               left: `${-210}px`,
//               width: `${650}px`,
//               height: `${800}px`,
//               willChange: "transform",
//             }}
//             alt="Human"
//             priority
//             className="absolute"
//             ref={imageRef2}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionOne;


// "use client";

// import Image from "next/image";
// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// const SectionOne = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const images = [
//     { ref: useRef<HTMLImageElement>(null), wrapper: useRef<HTMLDivElement>(null), top: -30, left: -30 },
//     { ref: useRef<HTMLImageElement>(null), wrapper: useRef<HTMLDivElement>(null), top: -320, left: -210 },
//   ];

//   useGSAP(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     images.forEach((imgData, i) => {
//       const image = imgData.ref.current;
//       const wrapper = imgData.wrapper.current;
//       if (!image || !wrapper) return;

//       // Continuous yoyo bounce for image itself
//       gsap.to(image, {
//         y: 40,
//         ease: "power1.inOut",
//         repeat: -1,
//         yoyo: true,
//         duration: 0.4 + Math.random() * 0.5,
//       });

//       // Scroll-triggered wrapper movement
//       gsap.to(wrapper, {
//         x: "100vw",
//         y: "100vh",
//         ease: "power1.inOut",
//         yoyo: true,
//         scale: 0.1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//           // Use onUpdate to check distance and delay nearest
//           onUpdate: (self) => {
//             const scrollY = self.scroll();
//             const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
//             const distance = Math.abs(wrapperTop - scrollY);
//             const nearestDelay = distance / window.innerHeight; // closer = smaller delay
//             gsap.to(wrapper, { delay: nearestDelay, duration: 1 });
//           },
//         },
//       });
//     });
//   });

//   return (
//     <div ref={sectionRef} className="h-screen w-screen relative">
//       <div className="w-full h-full">
//         {images.map((img, i) => (
//           <div key={i} ref={img.wrapper} className="">
//             <Image
//               src="/human/img11.webp"
//               width={650}
//               height={800}
//               style={{
//                 objectFit: "cover",
//                 objectPosition: "top",
//                 top: `${img.top}px`,
//                 left: `${img.left}px`,
//                 width: "650px",
//                 height: "800px",
//                 willChange: "transform",
//               }}
//               alt="Human"
//               priority
//               className="absolute"
//               ref={img.ref}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SectionOne;


"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Side images data
const imagePositions = [
  { id: 1, top: "10vh", left: "5vw", size: 300 },
  { id: 2, top: "30vh", left: "15vw", size: 250 },
  { id: 3, top: "50vh", left: "25vw", size: 200 },
  { id: 4, top: "70vh", left: "35vw", size: 280 },
];

const centerImagePosition = { id: 5, top: "20vh", left: "45vw", size: 500, rotation: 0 };

const SectionOne = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Initialize as empty array
  const sideImageRefs = useRef<HTMLDivElement[]>([]);
  sideImageRefs.current = []; // reset on each render

  const centerImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Phase I: Bounce animation ---
    const tl_bounce = gsap.timeline({
      repeat: -1,
      yoyo: true,
      paused: false,
    });

    tl_bounce.to([...sideImageRefs.current, centerImageRef.current], {
      y: 15,
    //   rotation: 2,
      ease: "sine.inOut",
      duration: 1.5,
      stagger: 0.1,
    });

    // Phase II: Scroll-triggered exit
    // const targetsForExit = [...sideImageRefs.current].reverse();
    const targetsForExit = [...sideImageRefs.current];

    const tl_scroll = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        onToggle: (self) => {
          if (self.isActive) {
            tl_bounce.pause();
          } else {
            tl_bounce.play();
          }
        },
        markers: true,
      },
    });

    tl_scroll.to(targetsForExit, {
      x: "80vw",
      y: "80vh",
      scale: 0.1,
    //   opacity: 0,
    //   rotation: 30,
      stagger: { amount: 0.8, from: "end" },
      duration: 1.5,
      ease: "power2.in",
    });

    // Center image exit
    tl_scroll.to(
      centerImageRef.current,
      {
        // rotation: 720,
        scale: 10,
        // opacity: 0,
        duration: 1.5,
        ease: "power3.inOut",
      },
      ">",
    );
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="h-[400vh] w-screen relative">
      <div className="w-full h-screen sticky top-0 overflow-hidden">
        {imagePositions.map((img) => (
          <div
            key={img.id}
            ref={(el) => { if (el) sideImageRefs.current.push(el); }}
            style={{
              top: img.top,
              left: img.left,
              width: `${img.size}px`,
              height: `${img.size * 1.23}px`,
              willChange: "transform",
            }}
            className="absolute"
          >
            <Image
              src="/human/img11.webp"
              width={650}
              height={800}
              style={{ objectFit: "cover" }}
              alt={`Side Image ${img.id}`}
              priority
              className="w-full h-full"
            />
          </div>
        ))}

        <div
          ref={centerImageRef}
          style={{
            top: centerImagePosition.top,
            left: centerImagePosition.left,
            width: `${centerImagePosition.size}px`,
            height: `${centerImagePosition.size * 1.23}px`,
            willChange: "transform",
          }}
          className="absolute z-10"
        >
          <Image
            src="/human/img11.webp"
            width={650}
            height={800}
            style={{ objectFit: "cover" }}
            alt="Center Image"
            priority
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-4xl">Next Section Content</h2>
      </div>
    </div>
  );
};

export default SectionOne;
