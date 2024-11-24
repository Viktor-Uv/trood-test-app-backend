const {
  create,
  read,
  readAll,
  update,
  remove
} = require("../model/profileModel");
const ValidationError = require("../error/ValidationError");

const createProfile = async (req, res) => {
  try {
    const result = await create(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const readProfile = async (req, res) => {
  const profileId = req.params.id;
  try {
    const profile = await read(profileId);
    if (!profile) {
      return res.status(404).json({ error: `Profile id '${profileId}' not found` });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readAllProfiles = async (req, res) => {
  try {
    const result = await readAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const profileId = req.params.id;
  try {
    const result = await update(profileId, req.body);
    if (!result) {
      return res.status(404).json({ error: `Profile id '${profileId}' not found` });
    }
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    await remove(req.params.id);
    res.status(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProfile,
  readProfile,
  readAllProfiles,
  updateProfile,
  deleteProfile
};
