import { ValidationError } from 'joi';

export function handleErrorObjet(err: ValidationError) {
  const errorMessage = err.details.map(({ message, context }) => {
    return { message, context: context ? context.label : '' };
  });
  return errorMessage;
}
