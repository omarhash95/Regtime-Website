#!/usr/bin/env node

/**
 * Patch Script for SWC in Restricted Environments
 *
 * This script creates stub files for @next/swc packages to prevent
 * native addon loading in environments where native addons are disabled
 * (like Bolt's hosting environment).
 *
 * Run this after npm install to ensure SWC binaries don't cause build failures.
 */

const fs = require('fs');
const path = require('path');

const swcPackages = [
  '@next/swc-linux-x64-gnu',
  '@next/swc-linux-x64-musl'
];

const stubContent = `// Stub to prevent SWC binary loading in environments where native addons are disabled
module.exports = null;
`;

function patchSwcPackage(packageName) {
  const packagePath = path.join(__dirname, '..', 'node_modules', packageName);

  if (!fs.existsSync(packagePath)) {
    console.log(`⚠️  Package ${packageName} not found, skipping...`);
    return;
  }

  // Create stub index.js
  const indexPath = path.join(packagePath, 'index.js');
  fs.writeFileSync(indexPath, stubContent, 'utf8');

  // Update package.json to point to our stub
  const packageJsonPath = path.join(packagePath, 'package.json');
  const packageJson = {
    name: packageName,
    version: '14.2.33',
    main: 'index.js'
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

  console.log(`✅ Patched ${packageName}`);
}

console.log('🔧 Patching SWC packages for Bolt environment...\n');

swcPackages.forEach(patchSwcPackage);

console.log('\n✨ SWC patching complete! You can now run npm run build.');
