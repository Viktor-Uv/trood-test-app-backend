const {
  create,
  read,
  readAll,
  update,
  remove
} = require("../model/profileModel");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");

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
  try {
    const profile = await read(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
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
  try {
    const result = await update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
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
