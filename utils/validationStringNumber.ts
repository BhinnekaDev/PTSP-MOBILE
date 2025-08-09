export const validationStringNumber = (
  input: string,
  maxLength?: number
): string => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '').slice(0, maxLength);
};

export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@gmail\.com$/i;
  return re.test(email.trim());
};


export const isValidPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const re = /^08[0-9]{7,11}$/;
  return re.test(cleaned);
};

