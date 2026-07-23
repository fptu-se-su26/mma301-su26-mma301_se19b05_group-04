export const isValidEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const isNotEmpty = (value: string): boolean => value.trim().length > 0;

export const isMinLength = (value: string, min: number): boolean => value.length >= min;
