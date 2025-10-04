"use client";

import React from "react";
import PageOne from "@/components/pages/pageOne";
import PageTwo from "@/components/pages/pageTwo";
import Scroll from "@/components/pages/scroll";

const Home = () => {
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



  return (
    // <main className="no-scrollbar h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
    <main className="no-scrollbar  relative">
      <PageOne/>
      {/* <PageTwo/> */}
      <Scroll/>

     
    </main>
  );
};

export default Home;
