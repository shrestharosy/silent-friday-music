import Joi from 'joi';

const name = Joi.string()
  .alphanum()
  .max(30)
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case 'any.empty':
          err.message = 'Value should not be empty!';
          err.context && err.context.key;
          break;

        case 'string.max':
          err.message = `Value should have at most ${err.context && err.context.limit} characters!`;
          break;
        default:
          break;
      }
    });
    return errors;
  });

const members = Joi.array()
  .min(1)
  .unique();

// const master = Joi.string().required;

// const requests = Joi.array().items(Joi.string());

const baseRoom = Joi.object().keys({
  name,
  members,
  // requests,
  // master
});

export const createRoomSchema = baseRoom;
