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

const readProfile = (req, res) => {};

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
