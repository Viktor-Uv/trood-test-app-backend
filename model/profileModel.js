const db = require("../firestore");
const validateProfile = require("../validator/profileValidator");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");
const PROFILE_COLLECTION = "profiles";

const create = async (body) => {
  const validProfile = validateBody(body);
  const docRef = await db.collection(PROFILE_COLLECTION).add(validProfile);
  return { id: docRef.id, ...validProfile };
};

const read = async (id) => {
  const doc = await db.collection(PROFILE_COLLECTION).doc(id).get();
  if (!doc.exists) {
    throw new NotFoundError(`Id '${id}' not found`);
  }
  return { id: doc.id, ...doc.data() };
};

const readAll = async () => {
  const snapshot = await db.collection(PROFILE_COLLECTION).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const update = async (id, body) => {
  const validProfile = validateBody(body);

  try {
    await db.collection(PROFILE_COLLECTION).doc(id).update(validProfile);
    return { id, ...validProfile };
  } catch (err) {
    if (err.code === 5) {
      throw new NotFoundError(`Id '${id}' not found`);
    }
    throw new Error(err.message);
  }
};

const remove = async (id) => {
  await db.collection(PROFILE_COLLECTION).doc(id).delete();
};

const validateBody = (body) => {
  const validationResult = validateProfile(body);
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }
  return validationResult.value;
}

module.exports = {
  create,
  read,
  readAll,
  update,
  remove
};
