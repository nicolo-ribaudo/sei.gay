import * as strings from "./strings.ts";
import { urlParamsNames } from "./params.ts";
import { flagsNormalization } from "./dictionary.ts";

const style = await Deno.readTextFile(
  new URL("../static/main.css", import.meta.url)
);

type Data = {
  name: string;
  flag: string;
  urlSearchParams: string;
  lang: keyof typeof strings;
};

export function buildDocument(data: Data) {
  return /* html */ `
    <!DOCTYPE html>
    <html lang="${data.lang}">
      ${buildHead(data)}

      <body>
        <input id="open" type="checkbox" class="control" tabindex="1" aria-label="open/close envelope" />
        <input id="create" type="checkbox" class="control" tabindex="2" aria-label="open/close dialog" />

        <div class="envelope-container">
          <label for="open">
            <div class="envelope">
              ${buildEnvelopeParts(data)}
              ${buildLetter(data)}
              ${buildDialog(data)}
            </div>
          </label>
        </div>

        ${buildLanguagePicker(data)}

        <div class="link-github">
          Source code
          <a href="https://github.com/nicolo-ribaudo/sei.gay" target="_blank">on GitHub</a>.
        </div>

        <div class="link-me">
          Made by
          <a href="https://twitter.com/NicoloRibaudo" target="_blank">@NicoloRibaudo</a>.
        </div>

        ${buildSvgPaths()}
      </body>
    </html>`;
}

function buildHead({ lang }: Data) {
  return /* html */ `
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${strings[lang]["You are gay"]}!</title>

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content="💌 ${strings[lang]["Open me"]}!" />
      <meta property="og:image" content="/og-image-${lang}.webp" />
      ${"" /* Otherwise Matrix (and probably others) use the page contents */}
      <meta property="og:description" content="&hellip;" />

      ${"" /* https://css-tricks.com/emoji-as-a-favicon/ */}
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💌</text></svg>">

      ${"" /* <link rel="stylesheet" href="./main.css" /> */}
      ${
        ""
        /* We inline styles to prevent transitions from running on page load when the
        page is rendered before loading the stylesheets. */
      }
      <style>${style}</style>
    </head>
  `;
}

function buildLanguagePicker({ urlSearchParams, lang: currentLang }: Data) {
  return /* html */ `
    <div class="language-picker">
      ${Object.keys(strings)
        .filter((lang) => lang !== currentLang)
        .map((lang) => `<a href="/${lang}?${urlSearchParams}">${lang}</a>`)
        .join("")}
    </div>
  `;
}

function buildEnvelopeParts({ lang }: Data) {
  return /* html */ `
    <div class="envelope-part-container envelope-container-static">
      <div class="envelope-part envelope-left"></div>
      <div class="envelope-part envelope-right"></div>
      <div class="envelope-part-container envelope-container-bottom">
        <div class="envelope-part envelope-bottom"></div>
      </div>
    </div>
    <div class="envelope-part-container envelope-container-top">
      <div class="envelope-part envelope-top-backface"></div>
      <div class="envelope-part envelope-top">
        <p style="margin-top: 1em">${strings[lang]["Open me"]}!</p>
      </div>
    </div>
  `;
}

function buildLetter(data: Data) {
  const contents = buildLetterContents(data);

  return /* html */ `
    <div class="letter">
      <div class="letter-top">${contents}</div>
      <div class="letter-bottom">${contents}</div>
      <div class="letter-bottom-backface"></div>
    </div>
  `;
}

function buildLetterContents(data: Data) {
  const { lang } = data;

  const sanitizedName = data.name ? ` ${sanitizeHTML(data.name)}` : "";

  const flag = data.flag || "gay";
  const fontSize = `clamp(1em, ${15 / flag.length}em, 5em)`;
  const sanitizedFlag = sanitizeHTML(flag);
  const lowercaseFlag = flag.toLowerCase();
  let flagClass = "";
  if (flag && Object.hasOwn(flagsNormalization, lowercaseFlag)) {
    flagClass = `flag-${flagsNormalization[lowercaseFlag]}`;
  } else if (/^[a-z]+$/.test(lowercaseFlag)) {
    flagClass = `flag-${lowercaseFlag}`;
  }

  return /* html */ `
    <div class="letter-contents">
      <p>
        ${strings[lang]["Congratulations"]}${sanitizedName}!<br />
        ${strings[lang]["Now you are"]}<br />
        <span class="flag ${flagClass}" style="font-size: ${fontSize}">
          ${sanitizedFlag}
        </span>
      </p>
      <p class="button-write-letter-container">
        <label for="create">
          <span class="button" role="button" id="open-create">
            ${strings[lang]["Write a custom letter"]}!
          </span>
        </label>
        <label class="reverse-hidden">
          <span class="button">
            ${strings[lang]["Write a custom letter"]}!
          </span>
        </label>
      </p>
    </div>
  `;
}

function buildDialog({ lang }: Data) {
  return /* html */ `
    <div class="dialog">
      <div class="dialog-animation-helper-vertical">
        <div class="dialog-animation-helper-horizontal">
          <form method="get" class="dialog-contents">
            <label for="input-n" class="dialog-label dialog-row-1">
              ${strings[lang]["Name"]}:
            </label>
            <div class="dialog-input dialog-row-1">
              <input type="text" name="${urlParamsNames.name}" id="input-n" maxlength="100" />
            </div>
            <label for="input-f" class="dialog-label dialog-row-2">
              ${strings[lang]["Flag"]}:
            </label>
            <div class="dialog-input dialog-row-2">
              <input type="text" name="${urlParamsNames.flag}" id="input-f" maxlength="100" />
            </div>
            <span class="dialog-label button reverse-hidden">
              ${strings[lang]["Cancel"]}
            </span>
            <label for="create" class="dialog-label button" id="close-create">
              ${strings[lang]["Cancel"]}
            </label>
            <div class="dialog-input dialog-submit">
              <input type="hidden" name="${urlParamsNames.encode}" />
              <span class="button reverse-hidden">${strings[lang]["Create"]}</span>
              <input type="submit" value="${strings[lang]["Create"]}" class="button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

function buildSvgPaths() {
  /* Use https://yqnn.github.io/svg-path-editor/ to edit */

  return /* html */ `
    <svg width="0" height="0" viewBox="0 0 150 90">
      <defs>
        ${buildSvgClipPath(
          "envelope-top-path",
          "M 0 0 L 150 0 Q 150 5 144 9 L 81 51 Q 75 55 69 51 L 6 9 Q 0 5 0 0 Z"
        )}
        ${buildSvgClipPath(
          "envelope-top-rotated-path",
          "M 0 90 L 150 90 Q 150 85 144 81 L 81 39 Q 75 35 69 39 L 6 81 Q 0 85 0 90 Z"
        )}
        ${buildSvgClipPath(
          "envelope-bottom-path",
          "M 0 90 L 150 90 L 80 48 Q 75 45 70 48 Z"
        )}
        ${buildSvgClipPath("envelope-left-path", "M 0 0 L 0 90 L 70 48 Z")}
        ${buildSvgClipPath("envelope-right-path", "M 150 0 L 150 90 L 80 48 Z")}
      </defs>
    </svg>
  `;
}

function buildSvgClipPath(id: string, path: string) {
  return /* svg */ `
    <clipPath id="${id}" clipPathUnits="objectBoundingBox" transform="scale(0.00666666 0.01111111)">
      <path d="${path}" />
    </clipPath>
  `;
}

function sanitizeHTML(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
