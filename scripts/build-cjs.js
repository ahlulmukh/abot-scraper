import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const srcDir = join(projectRoot, "src");
const distCjsDir = join(projectRoot, "dist", "cjs");

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function convertToCommonJS(content) {
  content = content.replace(
    /import\s+(.+?)\s+from\s+['"](.+?)['"];?/g,
    (match, imports, module) => {
      if (module.startsWith(".") && module.endsWith(".js")) {
        module = module.slice(0, -3);
      }

      if (imports.includes("* as ")) {
        const varName = imports.replace("* as ", "").trim();
        return `const ${varName} = require("${module}");`;
      } else if (imports.includes("{") && imports.includes("}")) {
        return `const ${imports} = require("${module}");`;
      } else {
        const cleanImports = imports.trim();
        return `const ${cleanImports} = require("${module}");`;
      }
    }
  );

  content = content.replace(/export\s+default\s+(.+)/g, "module.exports = $1");

  content = content.replace(/export\s+\{([^}]+)\}/g, (match, exports) => {
    const exportList = exports.split(",").map((exp) => exp.trim());
    return (
      exportList.map((exp) => `module.exports.${exp} = ${exp}`).join(";\n") +
      ";"
    );
  });

  return content;
}

async function processFile(filePath, relativePath) {
  const content = await readFile(filePath, "utf-8");
  const convertedContent = await convertToCommonJS(content);

  const outputPath = join(distCjsDir, relativePath);
  await ensureDir(dirname(outputPath));
  await writeFile(outputPath, convertedContent);

  console.log(`Converted: ${relativePath}`);
}

async function processDirectory(dir, baseDir = "") {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(baseDir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, relativePath);
    } else if (entry.name.endsWith(".js")) {
      await processFile(fullPath, relativePath);
    }
  }
}

async function createPackageJson() {
  const packageJsonPath = join(distCjsDir, "package.json");
  const packageJsonContent = {
    type: "commonjs",
  };
  await writeFile(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
  console.log("Created package.json for CJS");
}

async function main() {
  console.log("Building CommonJS version...");
  await ensureDir(distCjsDir);
  await processDirectory(srcDir);
  await createPackageJson();
  console.log("CommonJS build completed!");
}

main().catch(console.error);
