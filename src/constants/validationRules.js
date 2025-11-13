const FORM_CONDITIONS = {
  EMAIL: [
    {
      description: '이메일 형식',
      test: (v) => /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$/.test(v),
    },
  ],
  NAME: [
    {
      description: '2~8자',
      test: (v) => v.length >= 2 && v.length <= 8,
    },
    {
      description: '영문, 한글, 숫자만 포함',
      test: (v) => /^[A-Za-z가-힣0-9]+$/.test(v),
    },
  ],
  PASSWORD: [
    {
      description: '영문 포함',
      test: (v) => /[A-Za-z]/.test(v),
    },
    {
      description: '숫자 포함',
      test: (v) => /[0-9]/.test(v),
    },
  ],
  PASSWORD_CONFIRM: [
    {
      description: '비밀번호 일치',
      test: ({ value, pairValue }) =>
        !pairValue ? false : pairValue === value,
    },
  ],
};

export { FORM_CONDITIONS };
