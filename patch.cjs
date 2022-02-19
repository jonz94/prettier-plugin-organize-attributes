const fs = require("fs");
const path = require("path");

function makeSomeInternalFunctionsExport() {
  const filePath = path.join(__dirname, "./src/index.ts");
  const original = fs.readFileSync(filePath, "utf-8");

  const patched = original
    .split("\n")
    .map((line) => {
      line = line.replace(
        /^function transformPostParse\(/,
        "export function transformPostParse("
      );

      return line;
    })
    .join("\n");

  fs.writeFileSync(filePath, patched, "utf-8");
}

function updatePackageInfo() {
  const packageJson = require("./package.json");

  packageJson.name = "@jonz94/prettier-plugin-organize-attributes";
  packageJson.description = `A patched https://github.com/NiklasPor/prettier-plugin-organize-attributes package to make some internal function export.`;
  packageJson.repository.url =
    "https://github.com/jonz94/prettier-plugin-organize-attributes";

  const content = JSON.stringify(packageJson, null, 2);

  fs.writeFileSync("./package.json", content, "utf-8");
}

function main() {
  makeSomeInternalFunctionsExport();
  updatePackageInfo();
}

main();
