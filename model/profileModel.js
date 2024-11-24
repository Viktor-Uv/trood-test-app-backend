const db = require("../firestore");
const validateProfile = require("../validator/profileValidator");
const e = require("express");
const PROFILE_COLLECTION = "profiles";

const create = async (body) => {
  try {
    validateProfile(body);
  } catch (error) {
    throw new Error(`Validation Error: ${error.details}`);
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
