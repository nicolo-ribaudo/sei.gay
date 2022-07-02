function stringify(gradient) {
  return gradient.map(({ color, at }) => `${color} ${at}%`).join(", ");
}

const rainbow = [
  { color: "rgba(255, 0, 0, 1)", at: 0 },
  { color: "rgba(255, 154, 0, 1)", at: 10 },
  { color: "rgba(208, 222, 33, 1)", at: 20 },
  { color: "rgba(79, 220, 74, 1)", at: 30 },
  { color: "rgba(63, 218, 216, 1)", at: 40 },
  { color: "rgba(47, 201, 226, 1)", at: 50 },
  { color: "rgba(28, 127, 238, 1)", at: 60 },
  { color: "rgba(95, 21, 242, 1)", at: 70 },
  { color: "rgba(186, 12, 248, 1)", at: 80 },
  { color: "rgba(251, 7, 217, 1)", at: 90 },
  { color: "rgba(255, 0, 0, 1)", at: 100 },
];

const doubleRainbox = [
  ...rainbow
    .filter(({ at }) => at >= 50 && at < 100)
    .map(({ color, at }) => ({ color, at: at / 2 - 25 })),
  ...rainbow.map(({ color, at }) => ({ color, at: at / 2 + 25 })),
  ...rainbow
    .filter(({ at }) => at <= 50 && at > 0)
    .map(({ color, at }) => ({ color, at: 75 + at / 2 })),
];

console.log(`linear-gradient(45deg, ${stringify(doubleRainbox)})`);
