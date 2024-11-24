const express = require("express");
const router = express.Router();
const {
  createProfile,
  readProfile,
  readAllProfiles,
  updateProfile,
  deleteProfile
} = require("../controller/profileController");
const PROFILE_PATH = "/profiles";

router.post(PROFILE_PATH, createProfile);

router.get(`${PROFILE_PATH}/:id`, readProfile);

router.get(PROFILE_PATH, readAllProfiles);

router.put(`${PROFILE_PATH}/:id`, updateProfile);

router.delete(`${PROFILE_PATH}/:id`, deleteProfile);

module.exports = router;
