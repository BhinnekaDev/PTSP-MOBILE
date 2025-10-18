export const validationNumberOnly = (
  input: string,
  maxLength?: number
): string => {
  return input.replace(/[^0-9]/g, '').slice(0, maxLength);
};
