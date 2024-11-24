const db = require("../firestore");
const validateProfile = require("../validator/profileValidator");
const e = require("express");
const PROFILE_COLLECTION = "profiles";

const create = async (body) => {
  const validationResult = validateProfile(body);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
  const validProfile = validationResult.value;

  try {
    const docRef = await db.collection(PROFILE_COLLECTION).add(validProfile);
    return  { id: docRef.id, ...validProfile };
  } catch (err) {
    throw new Error(err.message);
  }
};

const read = (id) => {};

const readAll = () => {};

const update = (id, body) => {};

const remove = (id) => {};

module.exports = {
  create,
  read,
  readAll,
  update,
  remove
};
