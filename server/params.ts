export const urlParamsNames = {
  name: "n",
  flag: "f",
  encode: "e",
  encodedData: "d",
} as const;

export function encode(name: string | undefined, flag: string | undefined) {
  return btoa(unescape(encodeURIComponent(`${escapeColon(name ?? "")}:${escapeColon(flag ?? "")}`)));
}

export function decode(encoded: string) {
  return decodeURIComponent(escape(atob(encoded)))
    .split(/(?<!:):(?!:)/)
    .map(unescapeColon);
}

function escapeColon(str: string) {
  return str.replaceAll(/(:+)/g, ":$1");
}

function unescapeColon(str: string) {
  return str.replaceAll(/(:{2,})/g, (s) => s.slice(1));
}
