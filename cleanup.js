// cleanup.js

const fs = require('fs');
const { execSync } = require('child_process');

function safeExec(cmd) {
  console.log(`\n▶ Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❗ Error running "${cmd}":`, err.message);
    process.exit(1);
  }
}

console.log('=== STARTING CLEANUP & CONFIGURATION SCRIPT ===');

// Step 1: Remove old directories/files
safeExec('rm -rf node_modules');
safeExec('rm -f package-lock.json');
safeExec('rm -rf .next');

// Step 2: Install dependencies
safeExec('npm install');

// Step 3: Write updated next.config.js
const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};
module.exports = nextConfig;
`;
fs.writeFileSync('next.config.js', nextConfigContent, 'utf8');
console.log('✔ next.config.js updated');

// Step 4: Write simplified .babelrc
const babelConfig = { presets: ['next/babel'] };
fs.writeFileSync('.babelrc', JSON.stringify(babelConfig, null, 2), 'utf8');
console.log('✔ .babelrc written');

// Step 5: Build the project
safeExec('NEXT_DISABLE_FS_CACHE=1 DISABLE_V8_COMPILE_CACHE=1 npm run build');

console.log('=== CLEANUP & CONFIGURATION SCRIPT COMPLETED ===');
