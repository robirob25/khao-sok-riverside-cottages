import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(walk(full));
    } else if (f.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = walk('dist');
const missingAssets = new Set();
const unprefixedAssets = new Set();

for (const htmlPath of htmlFiles) {
  const content = fs.readFileSync(htmlPath, 'utf8');

  // Check src
  const srcMatches = content.matchAll(/src="([^"]+)"/g);
  for (const m of srcMatches) {
    const val = m[1];
    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:')) continue;
    if (val.startsWith('/khao-sok-riverside-cottages/')) {
      const rel = val.replace('/khao-sok-riverside-cottages/', '');
      const target = path.join('dist', rel);
      if (!fs.existsSync(target)) {
        missingAssets.add(`MISSING: ${val} (in ${path.relative('dist', htmlPath)})`);
      }
    } else if (val.startsWith('/')) {
      unprefixedAssets.add(`UNPREFIXED SRC: ${val} (in ${path.relative('dist', htmlPath)})`);
    }
  }

  // Check CSS url() in style tags or style attributes
  const urlMatches = content.matchAll(/url\((?:&quot;|&#39;|['"])?(\/[^'")&]+)(?:&quot;|&#39;|['"])?\)/g);
  for (const m of urlMatches) {
    const val = m[1];
    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:')) continue;
    if (val.startsWith('/khao-sok-riverside-cottages/')) {
      const rel = val.replace('/khao-sok-riverside-cottages/', '');
      const target = path.join('dist', rel);
      if (!fs.existsSync(target)) {
        missingAssets.add(`MISSING CSS URL: ${val} (in ${path.relative('dist', htmlPath)})`);
      }
    } else if (val.startsWith('/')) {
      unprefixedAssets.add(`UNPREFIXED CSS URL: ${val} (in ${path.relative('dist', htmlPath)})`);
    }
  }

  // Check srcset
  const srcsetMatches = content.matchAll(/srcset="([^"]+)"/g);
  for (const m of srcsetMatches) {
    const parts = m[1].split(',');
    for (const part of parts) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:')) continue;
      if (u.startsWith('/khao-sok-riverside-cottages/')) {
        const rel = u.replace('/khao-sok-riverside-cottages/', '');
        const target = path.join('dist', rel);
        if (!fs.existsSync(target)) {
          missingAssets.add(`MISSING SRCSET: ${u} (in ${path.relative('dist', htmlPath)})`);
        }
      } else if (u.startsWith('/')) {
        unprefixedAssets.add(`UNPREFIXED SRCSET: ${u} (in ${path.relative('dist', htmlPath)})`);
      }
    }
  }
}

console.log(`Missing assets: ${missingAssets.size}`);
for (const item of Array.from(missingAssets).slice(0, 20)) {
  console.log(item);
}

console.log(`\nUnprefixed assets: ${unprefixedAssets.size}`);
for (const item of Array.from(unprefixedAssets).slice(0, 20)) {
  console.log(item);
}
