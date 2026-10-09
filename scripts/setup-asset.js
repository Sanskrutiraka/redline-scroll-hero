const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'car.png');
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const possibleSources = [
  path.join('C:', 'Users', 'sansk', '.gemini', 'antigravity-ide', 'brain', '43b20284-1c23-4171-9602-5a73b8b64552', '.user_uploaded', 'media_1791555200899.png'),
  path.join(__dirname, '..', 'car.png'),
];

let copied = false;
for (const src of possibleSources) {
  if (fs.existsSync(src)) {
    try {
      fs.copyFileSync(src, targetPath);
      console.log(`[setup-asset] Successfully copied car image from ${src} to ${targetPath}`);
      copied = true;
      break;
    } catch (err) {
      console.error(`[setup-asset] Failed copying from ${src}:`, err.message);
    }
  }
}

if (!copied && !fs.existsSync(targetPath)) {
  console.warn('[setup-asset] Please ensure public/car.png is placed in the public directory.');
}
