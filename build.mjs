import nunjucks from "nunjucks";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = "templates";
const pagesDir = path.join(inputDir, "pages");
const outputDir = "dist";

// Setup Nunjucks environment with all template dirs
const env = nunjucks.configure(inputDir, { autoescape: true });

// Render only files from `pages/`
async function renderPages() {
  const files = await fs.readdir(pagesDir);
  
  for (const file of files) {
    if (!file.endsWith(".njk")) continue;

    const srcPath = path.join(pagesDir, file);
    const outPath = path.join(outputDir, file.replace(".njk", ".html"));

    const content = env.render(`pages/${file}`);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, content);
    console.log(`Rendered ${srcPath} → ${outPath}`);
  }
}

// Run build
renderPages().catch(console.error);
