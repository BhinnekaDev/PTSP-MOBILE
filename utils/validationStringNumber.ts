export const validationStringNumber = (
  input: string,
  maxLength?: number
): string => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '').slice(0, maxLength);
};
