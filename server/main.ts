import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import { buildDocument } from "./template.ts";

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
    if (deleteIfEmpty(searchParams, ["n", "f"])) {
      return Response.redirect(`${origin}${pathname}?${searchParams}`);
    }

    const document = buildDocument({
      name: searchParams.get("n"),
      flag: searchParams.get("f"),
      lang: pathname === "/en" ? "en" : "it",
    });

    return new Response(document, {
      headers: { "content-type": "text/html" },
    });
  }

  return Response.redirect(`${origin}/?${searchParams}`);
});

function deleteIfEmpty(map: URLSearchParams, keys: string[]) {
  let updated = false;
  for (const key of keys) {
    if (map.has(key) && !map.get(key)) {
      map.delete(key);
      updated = true;
    }
  }
  return updated;
}
