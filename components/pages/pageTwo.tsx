"use client";

import React from "react";
import VerticalBubbles from "../helpers/VerticalBubbles";



const PageTwo= () => {
  const bubbles = Array.from({ length: 8 });

  return (
    <section
    id="section-two"
      className="relative w-screen h-[100vh] grid place-items-center section section-two"
    >


        {bubbles.map((_, i) => (
        <VerticalBubbles key={i} />
      ))}
      
    </section>
  );
};

export default PageTwo;
