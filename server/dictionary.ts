export const flagsNormalization: { [word: string]: string } = {
  dyke: "lesbian",

  // Not same thing, but we can use the same non-rainbow brown color
  cis: "straight",

  // it
  etero: "straight",
  lesbica: "lesbian",
};

export function turkishLowercaseI(str: string) {
  return str.replaceAll("i", `<span style="font-variant:normal">i</span>`);
}
