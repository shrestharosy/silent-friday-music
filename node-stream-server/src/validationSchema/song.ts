import Joi from 'joi';

const url = Joi.string()
  .regex(/https:\/\/www.youtube.com\/watch\?/)
  .required();

const baseSong = Joi.object().keys({
  url,
});

export const addSongSchema = baseSong;
