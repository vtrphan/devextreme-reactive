#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const OLD_SCOPE = "@devexpress/";
const NEW_SCOPE = "@vtrphan/";

function listTrackedFiles() {
  const output = execSync("git ls-files", { encoding: "utf8" });
  return output
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
}

function replaceInFile(filePath) {
  const absPath = path.resolve(filePath);
  const content = fs.readFileSync(absPath, "utf8");
  if (!content.includes(OLD_SCOPE)) {
    return false;
  }
  const updated = content.split(OLD_SCOPE).join(NEW_SCOPE);
  if (updated !== content) {
    fs.writeFileSync(absPath, updated, "utf8");
    return true;
  }
  return false;
}

function main() {
  const files = listTrackedFiles();
  let changed = 0;
  files.forEach(file => {
    if (replaceInFile(file)) {
      changed += 1;
    }
  });
  console.log(`Updated scope in ${changed} files.`);
}

main();
