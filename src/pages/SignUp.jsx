import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions, useForm } from '@/hooks';
import { Button, FormField, Indicator } from '@/components';
import { ERROR_TOAST_DURATION, FORM_CONDITIONS } from '@/constants';
import { toast } from 'react-toastify';

const FIELD_LIST = [
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

function SignUp() {
  const { formState, isFormValid, handleFormChange } = useForm({
    initialState: {
      email: { value: '', valid: false },
      name: { value: '', valid: false },
      password: { value: '', valid: false },
      passwordConfirm: { value: '', valid: false, pair: 'password' },
    },
  });
  const { user, loading, error } = useAuth();
  const { signUp, clearError } = useAuthActions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({
      email: formState.email.value,
      password: formState.password.value,
      name: formState.name.value,
    });
  };

  useEffect(() => {
    if (user) {
      toast.success('회원가입이 완료되었습니다.');
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { autoClose: ERROR_TOAST_DURATION });
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (loading) return <Indicator />;
  return (
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        회원가입
      </h1>
      <form
        className="mt-10 flex flex-col items-stretch gap-4"
        onSubmit={handleSubmit}
      >
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
