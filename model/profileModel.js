const db = require("../firestore");
const validateProfile = require("../validator/profileValidator");
const e = require("express");
const PROFILE_COLLECTION = "profiles";

const create = async (body) => {
  const validationResult = validateProfile(body);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  try {
    const docRef = await db.collection("profiles").add(body);
    return  { id: docRef.id, ...body };
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
