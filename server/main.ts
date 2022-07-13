import { serve } from "https://deno.land/std@0.147.0/http/server.ts";
import { extname } from "https://deno.land/std@0.147.0/path/mod.ts";

import { buildDocument } from "./template.ts";
import { encode, decode, urlParamsNames } from "./params.ts";
import * as strings from "./strings.ts";

type MyMap = new <K>(contents: readonly (readonly [K, string])[]) => {
  get(key: K): string;
};
type MySet<K> = new (contents: K[]) => { has(val: unknown): val is K };
type MyExtname = <Ext extends string>(
  pathname: `${string}.${Ext}`
) => `.${Ext}`;

const contentTypes = new (Map as MyMap)([
  [".css", "text/css"],
  [".woff2", "font/woff2"],
  [".webp", "image/webp"],
] as const);

type StaticExt = Parameters<typeof contentTypes.get>[0];

const staticFiles = new (Set as any as MySet<`${string}${StaticExt}`>)([
  "/main.css",
  "/Titan-One.woff2",
  "/Titan-One-ext.woff2",
  "/Titan-One-custom.woff2",
  "/og-image-it.webp",
  "/og-image-en.webp",
]);

type Lang = keyof typeof strings;

const validLangs = Object.keys(strings) as Lang[];
const validLangsSet = new (Set as any as MySet<Lang>)(validLangs);

serve(async (req) => {
  const { pathname, searchParams, origin } = new URL(req.url);

  if (staticFiles.has(pathname)) {
    const file = await Deno.readFile(
      new URL(`../static${pathname}`, import.meta.url)
    );

    return new Response(file, {
      headers: {
        "content-type": contentTypes.get((extname as MyExtname)(pathname)),
      },
    });
  }

  let lang = validLangs.find((lang) => pathname === `/${lang}`);

  if (lang === undefined && req.headers.has("accept-language")) {
    lang = parseAcceptLanguage(req.headers.get("accept-language")!)
      .map(({ lang }) => lang)
      .find((lang) => validLangsSet.has(lang)) as Lang | undefined;
  }

  if (pathname === "/" || lang !== undefined) {
    if (searchParams.has(urlParamsNames.encode)) {
      // If this request comes from the letter-generation form,
      // encode the name and flag as base64 to avoid spoilers
      // when receiving the link.

      const encoded = encode(
        searchParams.get(urlParamsNames.name)?.trim(),
        searchParams.get(urlParamsNames.flag)?.trim()
      );
      return Response.redirect(
        `${origin}${pathname}?${urlParamsNames.encodedData}=${encoded}`
      );
    }

    let name, flag;
    if (searchParams.has(urlParamsNames.encodedData)) {
      [name, flag] = decode(
        searchParams.get(urlParamsNames.encodedData) ?? ":"
      );
    } else {
      name = searchParams.get(urlParamsNames.name)?.trim() ?? "";
      flag = searchParams.get(urlParamsNames.flag)?.trim() ?? "";
    }

    if (name.length > 100 || flag.length > 100) {
      return Response.redirect(`${origin}${pathname}`);
    }

    const document = buildDocument({
      name,
      flag,
      urlSearchParams: searchParams.toString(),
      lang: lang ?? "it",
    });

    return new Response(document, {
      headers: { "content-type": "text/html" },
    });
  }

  return Response.redirect(`${origin}/?${searchParams}`);
});

function parseAcceptLanguage(acceptLanguage: string) {
  /**
   * RFC7231, section 5.3.5
   *       Accept-Language = 1#( language-range [ weight ] )
   *       language-range  =
   *                 <language-range, see [RFC4647], Section 2.1>
   *
   * RFC7231, section 5.3.1
   *       weight = OWS ";" OWS "q=" qvalue
   *       qvalue = ( "0" [ "." 0*3DIGIT ] )
   *              / ( "1" [ "." 0*3("0") ] )

   *   A sender of qvalue MUST NOT generate more than three digits after the
   *   decimal point.  User configuration of these values ought to be
   *   limited in the same fashion.

   * 1# means "a comma-separated list with at least one value", and
   * it's defined in section 7 of RFC7230.
   */

  return acceptLanguage
    .split(",")
    .map((lang) => {
      const match = lang.match(
        /^\s*(?<lang>.*)\s*;\s*q=(?<weight>[01]|0\.[0-9]{0,3}|1\.0{0.3})\s*$/
      );

      if (match === null) {
        return { lang: lang.trim(), weight: 1 };
      } else {
        return {
          lang: match.groups!.lang,
          weight: Number(match.groups!.weight),
        };
      }
    })
    .sort((a, b) => b.weight - a.weight);
}
