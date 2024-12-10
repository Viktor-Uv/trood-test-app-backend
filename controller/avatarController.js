const { upload, fetch } = require("../model/avatarModel");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");
const buildFileUrl = require("../util/urlUtility");
const { parseSingleFile } = require("../util/fileParser");

const uploadAvatar = async (req, res) => {
  try {
    await parseSingleFile(req, res);
    const uploadedAvatarFileName = await upload(req.file);
    const avatarUrl = buildFileUrl(
      req.protocol,
      req.headers.host,
      req.path,
      uploadedAvatarFileName
    );
    res.status(201).json({ url: avatarUrl });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const fetchAvatar = async (req, res) => {
  const filename = req.params.filename;

  try {
    const filePath = await fetch(filename);
    res.status(200).sendFile(filePath);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadAvatar, fetchAvatar };
