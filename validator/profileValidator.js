const Joi = require('joi');

const profileSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё\s-]+$/,
      {name: "[only letters, spaces & hyphens]"}
    )
    .min(2)
    .max(50)
    .required(),

  surname: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё\s-]+$/,
      {name: "[letters & spaces]"}
    )
    .min(2)
    .max(50)
    .required(),

  jobTitle: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё0-9\s-]+$/,
      {name: "[letters, numbers, spaces & hyphens]"}
    )
    .max(100),

  phone: Joi.string()
    .pattern(
      /^\+\d{10,15}$/,
      {name: "[starts with '+' and followed by 10-15 digits]"}
    )
    .required(),

  address: Joi.string()
    .pattern(
      /^[A-Za-zА-Яа-яЁё0-9\s.,-]+$/,
      {name: "[letters, numbers, spaces, punctuation & hyphens]"}
    )
    .max(200),

  interests: Joi.array()
    .items(
      Joi.string()
        .pattern(
          /^[A-Za-zА-Яа-яЁё0-9\s.,]+$/,
          {name: "[letters, numbers, spaces & punctuation]"}
        )
        .max(30)
    )
    .max(10),

  link: Joi.string()
    .uri()
    .max(200),

  profileVisibility: Joi.string()
    .valid('Public', 'Private')
    .default('Private'),
});

const validateProfile = profile => profileSchema.validate(profile);

module.exports = validateProfile;