import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import { buildDocument } from "./template.ts";
import { encode, decode, urlParamsNames } from "./params.ts";

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

  if (pathname === "/" || pathname === "/it" || pathname === "/en") {
    if (searchParams.has(urlParamsNames.encode)) {
      const encoded = encode(
        searchParams.get(urlParamsNames.name),
        searchParams.get(urlParamsNames.flag)
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
      name = searchParams.get(urlParamsNames.name) ?? "";
      flag = searchParams.get(urlParamsNames.flag) ?? "";
    }

    if (name.length > 100 || flag.length > 100) {
      return Response.redirect(`${origin}${pathname}`);
    }

    const document = buildDocument({
      name,
      flag,
      urlSearchParams: searchParams.toString(),
      lang: pathname === "/en" ? "en" : "it",
    });

    return new Response(document, {
      headers: { "content-type": "text/html" },
    });
  }

  return Response.redirect(`${origin}/?${searchParams}`);
});
