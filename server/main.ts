import { serve } from "https://deno.land/std@0.147.0/http/server.ts";

import { buildDocument } from "./template.ts";
import { encode, decode, urlParamsNames } from "./params.ts";
import * as strings from "./strings.ts";

serve(async (req) => {
  const { pathname, searchParams, origin } = new URL(req.url);

  if (pathname === "/main.css") {
    const file = await Deno.readFile(
      new URL("../static/main.css", import.meta.url)
    );

    return new Response(file, {
      headers: { "content-type": "text/css" },
    });
  }

  if (pathname === "/Titan-One.woff2" || pathname === "/Titan-One-ext.woff2") {
    const file = await Deno.readFile(
      new URL(`../static${pathname}`, import.meta.url)
    );

    return new Response(file, {
      headers: { "content-type": "font/woff2" },
    });
  }

  if (pathname === "/og-image-it.webp" || pathname === "/og-image-en.webp") {
    const file = await Deno.readFile(
      new URL(`../static/${pathname}`, import.meta.url)
    );

    return new Response(file, {
      headers: { "content-type": "image/webp" },
    });
  }

  const validLangs = Object.keys(strings) as Array<keyof typeof strings>;
  const lang = validLangs.find(lang => pathname === `/${lang}`);

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
