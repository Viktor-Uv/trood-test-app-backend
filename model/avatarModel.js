const validateAvatar = require("../validator/avatarValidator");
const NotFoundError = require("../error/NotFoundError");
const path = require("path");
const fs = require("fs");

const upload = async (file) => {
  validateAvatar(file);

  // Generate filepath and filename
  const timestamp = Date.now();
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digits number
  const fileExt = path.extname(file.originalname);
  const fileName = `${timestamp}${randomNum}${fileExt}`;
  const uploadDir = path.join(__dirname, "../public/avatar");
  const filePath = path.join(uploadDir, fileName);

  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  await fs.promises.writeFile(filePath, file.buffer);
  return fileName;
};

const fetch = async (url) => {};

module.exports = { upload, fetch };
