const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'build');
const dest = path.resolve(__dirname, '..', 'dist');

try {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  // Node 16.7+ has fs.cpSync
  if (fs.cpSync) {
    fs.cpSync(src, dest, { recursive: true });
  } else {
    // fallback copy
    const copyRecursiveSync = (src, dest) => {
      const exists = fs.existsSync(src);
      const stats = exists && fs.statSync(src);
      const isDirectory = exists && stats.isDirectory();
      if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
          copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
      } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
      }
    };
    copyRecursiveSync(src, dest);
  }
  console.log('Copied build/ -> dist/');
} catch (err) {
  console.error('Error copying build to dist:', err);
  process.exit(1);
}
