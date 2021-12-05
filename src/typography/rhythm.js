import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import postcss from "https://deno.land/x/postcss/mod.js";
import get_rhythm from "https://raw.githubusercontent.com/melhosseiny/get-rhythm/main/get_rhythm.js";

serve(async (request) => {
  const { pathname, searchParams } = new URL(request.url);

  const f0 = searchParams.get("f0");
  const r = searchParams.get("r");
  const i = searchParams.get("i");

  const css = `@scale ${f0} ${r} ${i};`;
  let response_body = await postcss([get_rhythm]).process(css);

  return new Response(response_body, {
    status: 200,
    headers: new Headers({
      "content-type": "text/css",
      "access-control-allow-origin": "*",
    })
  });
});
