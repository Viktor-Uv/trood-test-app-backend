const { upload, fetch } = require("../model/avatarModel");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");

const uploadAvatar = async (req, res) => {
  try {
    const fileUrl = await upload(req.file);
    res.status(201).json({ url: fileUrl });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const fetchAvatar = async (req, res) => {};

module.exports = { uploadAvatar, fetchAvatar };
