import posthtml from "posthtml";
import htmlnano from "htmlnano";
import { mkdir } from "fs/promises";

const html = await Bun.file("index.html").text();

const { html: minified } = await posthtml([
  htmlnano({
    collapseWhitespace: "aggressive",
    removeComments: "all",
    minifyCss: true,
    minifyJs: true,
    minifySvg: false,
  })
]).process(html);

await mkdir("dist", { recursive: true });
await Bun.write("dist/index.html", minified);

console.log(`Built dist/index.html (${minified.length} bytes)`);
