export const checkValidData = (email, password, name = null) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/.test(password);

  if (!isEmailValid) return "Email Id is not valid";
  if (!isPasswordValid) return "Oops! Make your password stronger — use A-Z, 0-9, symbols, and letters!";

  if (name !== null) {
    const isNameValid = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(name);
    if (!isNameValid) return "Name is not valid";
  }

  return null;
};
