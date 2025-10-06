"use client";

import React from "react";
import HorizontalBubbles from "../helpers/HorizontalBulbbles";



const PageThree= () => {
  const bubbles = Array.from({ length: 8 });

  return (
    <section

    id="section-three"
      className="relative w-screen h-screen  grid place-items-center section"
    >
       {bubbles.map((_, i) => (
        <HorizontalBubbles key={i} />
      ))}
     
    </section>
  );
};

export default PageThree;
