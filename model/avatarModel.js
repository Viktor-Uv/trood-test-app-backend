const validateAvatar = require("../validator/avatarValidator");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");
const fs = require("fs");
const {
  generateFileName,
  generateFullPath,
  ensureDirectoryExists
} = require("../util/fileUtility");
const AVATAR_FILEPATH = "../public/avatar";

const upload = async (file) => {
  if (!file) {
    throw new ValidationError("File is required");
  }
  validateAvatar(file);
  ensureDirectoryExists(__dirname, AVATAR_FILEPATH);
  const fileName = generateFileName(file.originalname);
  const filePath = generateFullPath(__dirname, AVATAR_FILEPATH, fileName);
  await fs.promises.writeFile(filePath, file.buffer);
  return fileName;
};

const fetch = async (fileName) => {
  const filePath = generateFullPath(__dirname, AVATAR_FILEPATH, fileName);
  if (!fs.existsSync(filePath)) {
    throw new NotFoundError(`${fileName} not found`);
  }
  return filePath;
};

module.exports = { upload, fetch };
