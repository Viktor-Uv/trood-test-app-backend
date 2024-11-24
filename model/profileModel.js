const db = require("../firestore");
const validateProfile = require('../validator/profileValidator');
const PROFILE_COLLECTION = "profiles";

const create = async (body, cb) => {
  const { error, profile } = validateProfile(body);
  if (error) {
    return cb(error.message);
  }

  try {
    const docRef = db.collection(PROFILE_COLLECTION).doc();
    await docRef.set(profile);
    cb(null, { id: docRef.id, ...profile });
  } catch (err) {
    cb(err.message);
  }
};

const read = (id, cb) => {};

const readAll = (cb) => {};

const update = (id, body, cb) => {};

const remove = (id, cb) => {};

module.exports = {
  create,
  read,
  readAll,
  update,
  remove
};
