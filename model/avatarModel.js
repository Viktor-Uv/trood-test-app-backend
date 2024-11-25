const validateAvatar = require("../validator/avatarValidator");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");
const path = require("path");
const fs = require("fs");
const AVATAR_FILEPATH = "../public/avatar";

const upload = async (file) => {
  if (!file) {
    throw new ValidationError("File is required");
  }
  validateAvatar(file);

  // Generate filepath and filename
  const timestamp = Date.now();
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digits number
  const fileExt = path.extname(file.originalname);
  const fileName = `${timestamp}${randomNum}${fileExt}`;
  const uploadDir = path.join(__dirname, AVATAR_FILEPATH);
  const filePath = path.join(uploadDir, fileName);

  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  await fs.promises.writeFile(filePath, file.buffer);
  return fileName;
};

const fetch = async (filename) => {
  const filePath = path.join(__dirname, AVATAR_FILEPATH, filename);

  if (!fs.existsSync(filePath)) {
    throw new NotFoundError(`${filename} not found`);
  }

  return filePath;
};

module.exports = { upload, fetch };
