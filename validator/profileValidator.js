const Joi = require('joi');

const profileSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zА-Яа-яЁё\s-]+$/)
    .min(2)
    .max(50)
    .required(),

  surname: Joi.string()
    .pattern(/^[A-Za-zА-Яа-яЁё\s-]+$/)
    .min(2)
    .max(50)
    .required(),

  jobTitle: Joi.string()
    .pattern(/^[A-Za-zА-Яа-яЁё0-9\s.,-]+$/)
    .max(100),

  phone: Joi.string()
    .pattern(/^\+\d{10,15}$/)
    .required(),

  address: Joi.string()
    .pattern(/^[A-Za-zА-Яа-яЁё0-9\s.,-]+$/)
    .max(200),

  interests: Joi.array()
    .items(
      Joi.string()
        .max(30)
    ).max(10),

  links: Joi.string()
    .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/)
    .max(200),

  profileVisibility: Joi.string()
    .valid('Public', 'Private')
    .default('Private'),
});

const validateProfile = profile => profileSchema.validate(profile);

module.exports = validateProfile;
