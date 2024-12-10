const multer = require("multer");
const ValidationError = require("../error/ValidationError.js");

const multerParser = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.parseSingleFile = (req, res) => {
  const multerMiddleware = multerParser.any();

  return new Promise((resolve, reject) => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        reject(err);
      }

      const files = req.files;

      if (!files || files.length === 0) {
        return reject(new ValidationError('File is required'));
      }

      if (files.length > 1) {
        return reject(new ValidationError('Single file per request is required'));
      }

      req.file = files[0];

      resolve();
    });
  });
};
