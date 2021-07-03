import postcss from "https://deno.land/x/postcss/mod.js";
import get_rhythm from "https://raw.githubusercontent.com/melhosseiny/get-rhythm/main/get_rhythm.js";

const css = '@scale 16 1.618 2;';

const result = await postcss([get_rhythm]).process(css);

console.log(result.css);
