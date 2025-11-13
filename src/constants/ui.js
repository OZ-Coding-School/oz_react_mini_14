import { FORM_CONDITIONS } from './validationRules';

const TOAST_DURATION = {
  default: 2000,
  error: 4000,
};

const SIGNUP_FIELDS = [
  {
    label: '이메일',
    type: 'email',
    name: 'email',
    conditions: FORM_CONDITIONS.EMAIL,
  },
  {
    label: '이름',
    type: 'text',
    name: 'name',
    conditions: FORM_CONDITIONS.NAME,
  },
  {
    label: '비밀번호',
    type: 'password',
    name: 'password',
    conditions: FORM_CONDITIONS.PASSWORD,
  },
  {
    label: '비밀번호 확인',
    type: 'password',
    name: 'passwordConfirm',
    conditions: FORM_CONDITIONS.PASSWORD_CONFIRM,
    pair: 'password',
  },
];

const LOGIN_FIELDS = SIGNUP_FIELDS.filter((field) =>
  ['email', 'password'].includes(field.name),
);

const SocialAuthButtonsMode = {
  SIGNUP: 'signup',
  LOGIN: 'login',
};

export { TOAST_DURATION, SIGNUP_FIELDS, LOGIN_FIELDS, SocialAuthButtonsMode };
