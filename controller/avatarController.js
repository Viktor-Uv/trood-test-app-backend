const { upload, fetch } = require("../model/avatarModel");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");
const buildFileUrl = require("../util/urlUtility");

const uploadAvatar = async (req, res) => {
  try {
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

const fetchAvatar = async (req, res) => {};

module.exports = { uploadAvatar, fetchAvatar };
