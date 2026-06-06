import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(rootDir, "src");
const extensionCandidates = ["", ".ts", ".tsx", ".js", ".mjs"];
const indexCandidates = ["index.ts", "index.tsx", "index.js", "index.mjs"];

export async function resolve(specifier, context, defaultResolve) {
  if (specifier.startsWith("@/")) {
    const resolvedPath = resolveWithCandidateExtensions(
      path.join(srcDir, specifier.slice(2)),
    );

    if (resolvedPath) {
      return {
        shortCircuit: true,
        url: pathToFileURL(resolvedPath).href,
      };
    }
  }

  if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
    const parentPath = fileURLToPath(context.parentURL);
    const resolvedPath = resolveWithCandidateExtensions(
      path.resolve(path.dirname(parentPath), specifier),
    );

    if (resolvedPath) {
      return {
        shortCircuit: true,
        url: pathToFileURL(resolvedPath).href,
      };
    }
  }

  return defaultResolve(specifier, context, defaultResolve);
}

function resolveWithCandidateExtensions(basePath) {
  for (const extension of extensionCandidates) {
    const candidate = `${basePath}${extension}`;

    if (isFile(candidate)) {
      return candidate;
    }
  }

  if (isDirectory(basePath)) {
    for (const indexCandidate of indexCandidates) {
      const candidate = path.join(basePath, indexCandidate);

      if (isFile(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

function isFile(filePath) {
  return existsSync(filePath) && statSync(filePath).isFile();
}

function isDirectory(filePath) {
  return existsSync(filePath) && statSync(filePath).isDirectory();
}
