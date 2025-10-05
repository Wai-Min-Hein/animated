"use client";

import React from "react";
import AnimatedImage from "./helpers/AnimatedImage";


export const offset = (value: number, range: number = 60) =>
  value + Math.floor(Math.random() * range - range / 2);

const ImageOverlap = () => {
  const rowTops = [
    offset(-300, 80), // Row 1
    offset(-100, 80), // Row 2
    offset(150, 80),  // Row 3
    offset(400, 80),  // Row 4
    offset(700, 80),  // Row 5
    offset(1000, 80), // Row 6
  ];

  return (
    <>
      <AnimatedImage top={offset(rowTops[0])} left={offset(-250)} src="/human/img11.webp" />
      {/* <AnimatedImage top={offset(rowTops[0])} left={offset(0)} src="/human/img12.webp" />
      <AnimatedImage top={offset(rowTops[0])} left={offset(250)} src="/human/img13.webp" />
      <AnimatedImage top={offset(rowTops[0])} left={offset(500)} src="/human/img14.webp" />
      <AnimatedImage top={offset(rowTops[0])} left={offset(900)} src="/human/img15.webp" />

      <AnimatedImage top={offset(rowTops[1])} left={offset(-250)} src="/human/img6.webp" />
      <AnimatedImage top={offset(rowTops[1])} left={offset(0)} src="/human/img7.webp" />
      <AnimatedImage top={offset(rowTops[1])} left={offset(250)} src="/human/img8.webp" />
      <AnimatedImage top={offset(rowTops[1])} left={offset(500)} src="/human/img9.webp" />
      <AnimatedImage top={offset(rowTops[1])} left={offset(900)} src="/human/img10.webp" />

      <AnimatedImage top={offset(rowTops[2])} left={offset(-250)} src="/human/img16.webp" />
      <AnimatedImage top={offset(rowTops[2])} left={offset(0)} src="/human/img12.webp" />
      <AnimatedImage top={offset(rowTops[2])} left={offset(250)} src="/human/human.webp" />
      <AnimatedImage top={offset(rowTops[2])} left={offset(500)} src="/human/img11.webp" />
      <AnimatedImage top={offset(rowTops[2])} left={offset(900)} src="/human/img7.webp" />

      <AnimatedImage top={offset(rowTops[3])} left={offset(-250)} src="/human/img1.webp" />
      <AnimatedImage top={offset(rowTops[3])} left={offset(0)} src="/human/img2.webp" />
      <AnimatedImage top={offset(rowTops[3])} left={offset(250)} src="/human/img8.webp" />
      <AnimatedImage top={offset(rowTops[3])} left={offset(500)} src="/human/img4.webp" />
      <AnimatedImage top={offset(rowTops[3])} left={offset(900)} src="/human/img5.webp" />

      <AnimatedImage top={offset(rowTops[4])} left={offset(-250)} src="/human/img6.webp" />
      <AnimatedImage top={offset(rowTops[4])} left={offset(0)} src="/human/img7.webp" />
      <AnimatedImage top={offset(rowTops[4])} left={offset(250)} src="/human/img8.webp" />
      <AnimatedImage top={offset(rowTops[4])} left={offset(500)} src="/human/img9.webp" />
      <AnimatedImage top={offset(rowTops[4])} left={offset(900)} src="/human/img10.webp" />

      <AnimatedImage top={offset(rowTops[5])} left={offset(-250)} src="/human/img11.webp" />
      <AnimatedImage top={offset(rowTops[5])} left={offset(0)} src="/human/img12.webp" />
      <AnimatedImage top={offset(rowTops[5])} left={offset(250)} src="/human/img13.webp" />
      <AnimatedImage top={offset(rowTops[5])} left={offset(500)} src="/human/img14.webp" />
      <AnimatedImage top={offset(rowTops[5])} left={offset(900)} src="/human/img15.webp" /> */}
    </>
  );
};

export default ImageOverlap;
