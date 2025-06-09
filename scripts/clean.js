import { rm } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const distDir = join(projectRoot, "dist");

async function clean() {
  try {
    await rm(distDir, { recursive: true, force: true });
    console.log("Cleaned dist directory");
  } catch (error) {
    console.log("No dist directory to clean");
  }
}

clean().catch(console.error);
