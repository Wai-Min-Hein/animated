export const offset = (value: number, range: number = 60) =>
  value + Math.floor(Math.random() * range - range / 2);

// Row Y positions
export  const rowTops = [-300, -100, 150, 400, 700, 1000].map((top) =>
    offset(top, 80)
  );

  // Images for each row
export  const rows = [
    [
      "/human/img11.webp",
      "/human/img12.webp",
      "/human/img13.webp",
      "/human/img14.webp",
      "/human/img15.webp",
    ],
    [
      "/human/img6.webp",
      "/human/img7.webp",
      "/human/img8.webp",
      "/human/img9.webp",
      "/human/img10.webp",
    ],
    [
      "/human/img16.webp",
      "/human/img12.webp",
      "/human/human.webp",
      "/human/img11.webp",
      "/human/img7.webp",
    ],
    [
      "/human/img1.webp",
      "/human/img2.webp",
      "/human/img8.webp",
      "/human/img4.webp",
      "/human/img5.webp",
    ],
    [
      "/human/img6.webp",
      "/human/img7.webp",
      "/human/img8.webp",
      "/human/img9.webp",
      "/human/img10.webp",
    ],
    [
      "/human/img11.webp",
      "/human/img12.webp",
      "/human/img13.webp",
      "/human/img14.webp",
      "/human/img15.webp",
    ],
  ];

export  const leftPositions = [-250, 0, 250, 500, 900];
