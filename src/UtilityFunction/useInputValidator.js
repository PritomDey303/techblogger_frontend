//email validator function
export const emailValidator = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

//bangladeshi mobile number validator function
export const mobileValidator = (mobile) => {
  const regex = /^(?:\+?88)?01[13-9]\d{8}$/;
  return regex.test(mobile);
};

//password validator function
export const passwordValidator = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return regex.test(password);
};

//password match validator function
export const passwordMatchValidator = (password, confirmPassword) => {
  return password === confirmPassword;
};
export const usernameValidator = (username) => {
  const regex = /^[a-zA-Z0-9_]{4,}$/;
  return regex.test(username);
};
export const checkStringType = (input) => {
  // Regular expressions for email, mobile number, and username patterns
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const mobileRegex = /^[0-9]{10}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;

  if (emailRegex.test(input)) {
    return "email";
  } else if (mobileRegex.test(input)) {
    return "email";
  } else if (usernameRegex.test(input)) {
    return "username";
  } else {
    return "Invalid input";
  }
};
