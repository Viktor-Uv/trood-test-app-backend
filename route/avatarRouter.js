const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadAvatar, fetchAvatar } = require("../controller/avatarController");
const AVATAR_PATH = "/avatars";
const tmpStorage = multer({ storage: multer.memoryStorage() });

router.post(AVATAR_PATH, tmpStorage.single("avatar"), uploadAvatar);

router.get(`${AVATAR_PATH}/:id`, fetchAvatar);

module.exports = router;
