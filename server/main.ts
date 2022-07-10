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

  const validLangs = Object.keys(strings) as Array<keyof typeof strings>;
  const lang = validLangs.find((lang) => pathname === `/${lang}`);

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
