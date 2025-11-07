import { useCallback, useState } from 'react';
import { Button, FormField } from '@/components';

const CONDITIONS = {
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

const FIELD_LIST = [
  {
    label: '이메일',
    type: 'email',
    name: 'email',
    conditions: CONDITIONS.EMAIL,
  },
  {
    label: '이름',
    type: 'text',
    name: 'name',
    conditions: CONDITIONS.NAME,
  },
  {
    label: '비밀번호',
    type: 'password',
    name: 'password',
    conditions: CONDITIONS.PASSWORD,
  },
  {
    label: '비밀번호 확인',
    type: 'password',
    name: 'passwordConfirm',
    conditions: CONDITIONS.PASSWORD_CONFIRM,
    pair: 'password',
  },
];

function SignUp() {
  const [formState, setFormState] = useState({
    email: { value: '', valid: false },
    name: { value: '', valid: false },
    password: { value: '', valid: false },
    passwordConfirm: { value: '', valid: false, pair: 'password' },
  });
  const isFormValid = Object.values(formState).every(({ valid }) => valid);

  const handleFormChange = useCallback(
    ({ fieldName, value, valid }) =>
      setFormState((prev) => ({
        ...prev,
        [fieldName]: { ...prev[fieldName], value, valid },
      })),
    [],
  );

  return (
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        회원가입
      </h1>
      <form className="mt-10 flex flex-col items-stretch gap-4">
        {FIELD_LIST.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            conditions={field.conditions}
            value={formState[field.name].value}
            pairValue={field.pair ? formState[field.pair].value : undefined}
            valid={formState[field.name].valid}
            onChange={handleFormChange}
          />
        ))}
        <Button
          type="submit"
          variant="stone"
          size="full"
          disabled={!isFormValid}
          className="text-xl"
        >
          회원가입
        </Button>
      </form>
    </section>
  );
}

export default SignUp;
