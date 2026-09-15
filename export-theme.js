/**
 * Theme Export Script (Vite)
 *
 * Copies only the files/folders you specify into an export directory.
 * Run your Vite build first so /public contains the optimized assets + manifest.
 *
 * Usage:
 *   npm run build
 *   node scripts/export-theme.js
 */

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

// === Configure ===
const exportPath = 'amicable'; // folder to export into

// root-level files to include
const files = [
  'theme.json',
];

// folders to include
const folders = [
  'app',
  'public',
];

// items to delete after copy (same cleanup as your old script, adjusted for Vite)
const removeAfterCopy = [
  // Keep Vite's public/manifest.json on purpose.
  path.join(exportPath, 'vendor/bin'),
  path.join(exportPath, 'vendor/composer/installers'),
];

// === Helpers ===
async function exists(p) {
  try { await fsp.access(p); return true; } catch { return false; }
}

async function rimraf(p) {
  await fsp.rm(p, { recursive: true, force: true });
}

async function copyFileIfExists(src, dest) {
  if (await exists(src)) {
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.copyFile(src, dest);
  }
}

async function copyDirIfExists(src, dest) {
  if (await exists(src)) {
    // Node 16.7+ supports fs.cp
    await fsp.cp(src, dest, { recursive: true, force: true });
  }
}

async function main() {
  // 1) start clean
  await rimraf(exportPath);

  // 2) copy listed files
  for (const file of files) {
    const src = path.resolve(file);
    const dest = path.join(exportPath, file);
    await copyFileIfExists(src, dest);
  }

  // 3) copy listed folders
  for (const folder of folders) {
    const src = path.resolve(folder);
    const dest = path.join(exportPath, folder);
    await copyDirIfExists(src, dest);
  }

  // 4) post-copy cleanup
  for (const p of removeAfterCopy) {
    await rimraf(p);
  }

  console.log(`✅ Export complete → ${exportPath}`);
}

main().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});