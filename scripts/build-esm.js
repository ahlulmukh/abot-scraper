import { copyFile, mkdir, readdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const srcDir = join(projectRoot, "src");
const distEsmDir = join(projectRoot, "dist", "esm");

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function copyDirectory(src, dest) {
  await ensureDir(dest);
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
      console.log(`Copied: ${entry.name}`);
    }
  }
}

async function createPackageJson() {
  const packageJsonPath = join(distEsmDir, "package.json");
  const packageJsonContent = {
    type: "module",
  };
  await writeFile(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
  console.log("Created package.json for ESM");
}

async function main() {
  console.log("Building ESM version...");
  try {
    await copyDirectory(srcDir, distEsmDir);
    await createPackageJson();
    console.log("ESM build completed!");
  } catch (error) {
    console.error("ESM build failed:", error);
    throw error;
  }
}

main().catch(console.error);
