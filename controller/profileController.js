const {
  create,
  read,
  readAll,
  update,
  remove
} = require("../model/profileModel");

const createProfile = async (req, res) => {
  try {
    const result = await create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const readProfile = async (req, res) => {
  try {
    const profile = await read(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readAllProfiles = (req, res) => {};

const updateProfile = (req, res) => {};

const deleteProfile = (req, res) => {};

module.exports = {
  createProfile,
  readProfile,
  readAllProfiles,
  updateProfile,
  deleteProfile
};
