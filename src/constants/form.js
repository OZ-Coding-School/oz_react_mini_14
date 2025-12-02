const common = {
  email: { value: '', valid: false },
  password: { value: '', valid: false },
};

const INITIAL_FORM_STATE = {
  SIGNUP: {
    ...common,
    name: { value: '', valid: false },
    passwordConfirm: { value: '', valid: false, pair: 'password' },
  },
  LOGIN: { ...common },
};

export { INITIAL_FORM_STATE };
