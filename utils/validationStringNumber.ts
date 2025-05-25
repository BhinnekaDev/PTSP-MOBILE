export const validationStringNumber = (input: string, maxLength?: number): string => {
  return input.replace(/[^A-Za-z0-9\s]/g, "").slice(0, maxLength);
};
