import Joi from 'joi';

const name = Joi.string()
  .max(30)
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
  .items(Joi.string())
  .unique();

const master = Joi.string();

const requests = Joi.array().items(Joi.string());

const baseRoom = Joi.object().keys({
  name,
  members,
  master,
  requests,
});

export const createRoomSchema = baseRoom.keys({
  name: name.required(),
});

export const updateRoomSchema = baseRoom;
