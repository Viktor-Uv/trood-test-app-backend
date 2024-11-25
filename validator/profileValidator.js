const Joi = require('joi');
const ValidationError = require("../error/ValidationError");

const allowedUrl = { scheme: ['http', 'https'] };

const profileSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё\s-]+$/,
      { name: "[letters, spaces & hyphens]" }
    )
    .min(2)
    .max(50)
    .required(),

  surname: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё\s-]+$/,
      { name: "[letters & spaces]" }
    )
    .min(2)
    .max(50)
    .required(),

  jobTitle: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё0-9\s-]+$/,
      { name: "[letters, numbers, spaces & hyphens]" }
    )
    .max(100),

  phone: Joi.string()
    .pattern(
      /^\+\d{10,15}$/,
      { name: "[symbol '+' followed by 10-15 digits]" }
    )
    .required(),

  address: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё0-9\s.,-]+$/,
      { name: "[letters, numbers, spaces, punctuation & hyphens]" }
    )
    .max(200),

  interests: Joi.array()
    .items(
      Joi.string()
        .pattern(
          /^[A-Za-zА-Яа-яЁё0-9\s.,]+$/,
          { name: "[letters, numbers, spaces & punctuation]" }
        )
        .max(30)
    )
    .max(10),

  link: Joi.string()
    .uri(allowedUrl)
    .max(200),

  profileVisibility: Joi.string()
    .valid('Public', 'Private')
    .default('Private'),

  avatar: Joi.string()
    .uri(allowedUrl)
});

const validateProfile = (profile) => {
  const { error, value } = profileSchema.validate(profile);
  if (error) {
    throw new ValidationError(error.message);
  }
  return value;
};

module.exports = validateProfile;
