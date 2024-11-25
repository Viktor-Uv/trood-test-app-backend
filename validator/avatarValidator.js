const Joi = require('joi');
const ValidationError = require("../error/ValidationError");

const avatarSchema = Joi.object({
  mimetype: Joi.string()
    .valid("image/jpg", "image/jpeg", "image/png")
    .required(),

  size: Joi.number()
    .max(5 * 1024 * 1024) // (5 * 2^10) - 5 MB filesize limit
    .required(),
});

const validateAvatar = (file) => {
  const {error} = avatarSchema.validate(file);
  if (error) {
    throw new ValidationError(error.message);
  }
};

module.exports = validateAvatar;
