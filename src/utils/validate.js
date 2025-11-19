// src/utils/validate.js
export const validate = {
  Email: {
    validate: (email) =>
      typeof email === "string" &&
      /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
  },
  Password: {
    validate: (password) =>
      typeof password === "string" && password.length >= 6,
  },
};
