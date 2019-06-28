import { ValidationError } from 'joi';

export function handleErrorObject(err: ValidationError) {
  const errorMessage = err.details.map(({ message, context }) => {
    return message;
  })[0];
  return errorMessage;
}
