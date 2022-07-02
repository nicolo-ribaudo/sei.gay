function stringify(gradient) {
  return gradient.map(({ color, at }) => `${color} ${at}%`).join(", ");
}

function reflect(gradient) {
  return [
    ...gradient
      .filter(({ at }) => at >= 50 && at < 100)
      .map(({ color, at }) => ({ color, at: at / 2 - 25 })),
    ...gradient.map(({ color, at }) => ({ color, at: at / 2 + 25 })),
    ...gradient
      .filter(({ at }) => at <= 50 && at > 0)
      .map(({ color, at }) => ({ color, at: 75 + at / 2 })),
  ];
}

function generate(label, gradient) {
  console.log(`\
.flag${label ? `-${label}` : ""} {
  background-image: linear-gradient(45deg, ${stringify(reflect(gradient))})
}
`);
}

generate("", [
  { color: "rgb(255, 0, 0)", at: 0 },
  { color: "rgb(255, 154, 0)", at: 10 },
  { color: "rgb(208, 222, 33)", at: 20 },
  { color: "rgb(79, 220, 74)", at: 30 },
  { color: "rgb(63, 218, 216)", at: 40 },
  { color: "rgb(47, 201, 226)", at: 50 },
  { color: "rgb(28, 127, 238)", at: 60 },
  { color: "rgb(95, 21, 242)", at: 70 },
  { color: "rgb(186, 12, 248)", at: 80 },
  { color: "rgb(251, 7, 217)", at: 90 },
  { color: "rgb(255, 0, 0)", at: 100 },
]);
/*
generate("rainbow", [
  { color: "#d04b36", at: 0 },
  { color: "#e36511", at: 17 },
  { color: "#ffba00", at: 33 },
  { color: "#00b180", at: 50 },
  { color: "#147aab", at: 67 },
  { color: "#675997", at: 83 },
  { color: "#d04b36", at: 100 },
]);*/
generate("trans", [
  { color: "#4fa5c2", at: 0 },
  { color: "#f587ac", at: 25 },
  { color: "#f9fbfc", at: 50 },
  { color: "#f587ac", at: 75 },
  { color: "#4fa5c2", at: 100 },
]);
