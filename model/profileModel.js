const db = require("../firestore");
const validateProfile = require("../validator/profileValidator");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");

const PROFILE_COLLECTION = "profiles";

const create = async (body) => {
  let validProfile;
  try {
    validProfile = validateBody(body);
  } catch (err) {
    throw new ValidationError(err.message);
  }

  try {
    const docRef = await db.collection(PROFILE_COLLECTION).add(validProfile);
    return { id: docRef.id, ...validProfile };
  } catch (err) {
    throw new Error(err.message);
  }
};

const read = async (id) => {
  try {
    const doc = await db.collection(PROFILE_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new NotFoundError();
    }
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw new NotFoundError(`Id '${id}' not found`);
    }
    throw new Error(err.message);
  }
};

const readAll = async () => {
  try {
    const snapshot = await db.collection(PROFILE_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    throw new Error(err.message);
  }
};

const update = async (id, body) => {
  let validProfile;
  try {
    validProfile = validateBody(body);
  } catch (err) {
    throw new ValidationError(err.message);
  }

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
  try {
    await db.collection(PROFILE_COLLECTION).doc(id).delete();
  } catch (err) {
    throw new Error(err.message);
  }
};

const validateBody = (body) => {
  const validationResult = validateProfile(body);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
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
