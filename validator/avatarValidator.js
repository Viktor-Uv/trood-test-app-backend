const Joi = require('joi');
const ValidationError = require("../error/ValidationError");

const avatarSchema = Joi.object({
  mimetype: Joi.string()
    .valid("image/jpg", "image/jpeg", "image/png")
    .required(),

  size: Joi.number()
    .max(5 * 1024 * 1024) // (5 * 2^10) - 5 MB filesize limit
    .message("Filesize must be less than or equal to 5 MB")
    .required(),
}).unknown();

const validateAvatar = (file) => {
  const {error} = avatarSchema.validate(file);
  if (error) {
    throw new ValidationError(error.message);
  }
};

module.exports = validateAvatar;
