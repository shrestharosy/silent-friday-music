import Joi from 'joi';

const userId = Joi.string().required();

const name = Joi.string()
  .alphanum()
  .max(30)
  .required();

const email = Joi.string()
  .email()
  .required();

const image = Joi.string().required();

const baseUser = Joi.object().keys({
  userId,
  name,
  email,
  image,
});

export const createUserSchema = baseUser;
