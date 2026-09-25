import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const basePath = process.env.BASE_PATH || (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '');

if (basePath && fs.existsSync(distDir)) {
  console.log(`[postbuild] Prefixing HTML links with basePath: "${basePath}"`);
  const escapedBase = basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(href|src)="(\\/(?!${escapedBase.slice(1)}|\\/)[^"]*)"`, 'g');

  let processedCount = 0;

  function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        const modified = content.replace(regex, (match, attr, val) => {
          return `${attr}="${basePath}${val}"`;
        });
        if (modified !== content) {
          fs.writeFileSync(fullPath, modified);
          processedCount++;
        }
      }
    }
  }

  walk(distDir);
  console.log(`[postbuild] Successfully patched ${processedCount} HTML files for GitHub Pages.`);
} else {
  console.log('[postbuild] No basePath specified, skipping prefixing.');
}
