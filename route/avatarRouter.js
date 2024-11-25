const express = require("express");
const router = express.Router();
const { uploadAvatar, fetchAvatar } = require("../controller/avatarController");
const AVATAR_PATH = "/avatars";

router.post(AVATAR_PATH, uploadAvatar);

router.get(`${AVATAR_PATH}/:id`, fetchAvatar);

module.exports = router;
