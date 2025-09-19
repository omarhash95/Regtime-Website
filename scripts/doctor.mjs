// scripts/doctor.mjs
// A minimal import checker for local files only.
// - Ignores node_modules, .next, dist, build, coverage, .git
// - Only checks relative ("./", "../") and alias ("@/") imports
// - Ignores bare specifiers ("react", "three", "zod", ...)

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIRS = [
  'app',
  'pages',
  'components',
  'hooks',
  'lib',
  'scenes',
  'styles',
  'utils',
  'public'
].map(d => path.join(ROOT, d)).filter(fs.existsSync);

const IGNORE_DIR_NAMES = new Set([
  'node_modules', '.next', 'dist', 'build', 'coverage', '.git'
]);

const SRC_EXTS = ['.ts', '.tsx', '.js', '.jsx'];
const MISSING = new Set();

function* walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIR_NAMES.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function isLocalSpecifier(spec) {
  return spec.startsWith('./') || spec.startsWith('../') || spec.startsWith('@/'); // alias
}

function resolveLocal(fromFile, spec) {
  let base;
  if (spec.startsWith('@/')) {
    base = path.join(ROOT, spec.replace(/^@\//, ''));
  } else {
    base = path.resolve(path.dirname(fromFile), spec);
  }
  const tries = [
    base,
    `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`,
    path.join(base, 'index.ts'), path.join(base, 'index.tsx'),
    path.join(base, 'index.js'), path.join(base, 'index.jsx')
  ];
  for (const t of tries) {
    try { if (fs.existsSync(t) && fs.statSync(t).isFile()) return true; } catch {}
  }
  return false;
}

for (const srcRoot of SRC_DIRS) {
  for (const file of walk(srcRoot)) {
    const ext = path.extname(file);
    if (!SRC_EXTS.includes(ext)) continue;
    const code = fs.readFileSync(file, 'utf8');

    // import ... from 'spec'
    // export ... from 'spec'
    const re = /\b(?:import|export)\b[^'"]*?from\s*['"]([^'"]+)['"]|^\s*import\s*['"]([^'"]+)['"]/gm;

    let m;
    while ((m = re.exec(code))) {
      const spec = (m[1] || m[2] || '').trim();
      if (!spec) continue;
      if (!isLocalSpecifier(spec)) continue; // ignore package imports
      if (!resolveLocal(file, spec)) {
        MISSING.add(`${spec}  ←  ${path.relative(ROOT, file)}`);
      }
    }
  }
}

if (MISSING.size) {
  console.log('❌ Missing local files referenced by imports:\n');
  for (const line of MISSING) console.log(' -', line);
  process.exit(1);
}

console.log('✅ No missing local import targets detected.');
process.exit(0);