"use client";

import Image from "next/image";
import React from "react";



const PageThree= () => {

  return (
    <section
      className="relative w-screen h-screen overflow-hidden grid place-items-center snap-start section"
    >
      <div
        className="z-[9999] w-[300px] h-[800px] relative hidden"
      >
        <Image
          src={"/human/human.webp"}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          alt="Human"
        />
      </div>
    </section>
  );
};

export default PageThree;
