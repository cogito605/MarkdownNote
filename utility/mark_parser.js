function parseMarkdown(content) {
  let lines = content.split("\n");
  let newHtml = [];

  for (let line of lines) {
    // block parsing
    if (line.startsWith("## ")) {
      newHtml.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith("# ")) {
      newHtml.push(`<h1>${line.slice(2)}</h1>`);
    } else {
      if (line !== "") {
        // inline parsing
        if (line.includes("**")) {
          let indexStart = line.indexOf("**");
          let indexEnd = line.indexOf("**", indexStart + 2);

          line =
            line.slice(0, indexStart) +
            "<strong>" +
            line.slice(indexStart + 2, indexEnd) +
            "</strong>" +
            line.slice(indexEnd + 2);
        } else if (line.includes("*")) {
          let indexStart = line.indexOf("*");
          let indexEnd = line.indexOf("*", indexStart + 1);

          line =
            line.slice(0, indexStart) +
            "<strong>" +
            line.slice(indexStart + 1, indexEnd) +
            "</strong>" +
            line.slice(indexEnd + 1);
        }

        newHtml.push(`<p>${line}</p>`);
      }
    }
  }

  return newHtml.join("\n");
}
module.exports = parseMarkdown;
