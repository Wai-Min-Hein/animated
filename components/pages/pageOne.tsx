"use client";

import Image from "next/image";
import React from "react";
import ScrollImages from "../helpers/pageOneScrollImage";



const PageOne = () => {
 
  return (
    <section className="relative w-screen h-screen overflow-hidden snap-start">
      <Image
        width={368}
        height={72}
        src="/logo.svg"
        alt="Logo"
        className="absolute top-4 left-4 z-[99999]"
      />
      <h1 className="absolute top-20 left-4 text-white font-bold">Home</h1>

     <ScrollImages/>
    </section>
  );
};

export default PageOne;
