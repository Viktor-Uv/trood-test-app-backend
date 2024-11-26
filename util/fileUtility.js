const path = require("path");
const fs = require("fs");

const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digits number
  const fileExt = path.extname(originalName);
  return `${timestamp}${randomNum}${fileExt}`;
};

const generateFullPath = (dirName, relPath, fileName) => {
  return path.join(dirName, relPath, fileName);
};

const ensureDirectoryExists = (directory, relPath) => {
  const dir = path.join(directory, relPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

module.exports = {
  generateFileName,
  generateFullPath,
  ensureDirectoryExists
};
