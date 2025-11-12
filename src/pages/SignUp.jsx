import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth, useAuthActions, useForm } from '@/hooks';
import { setHasJustLoggedIn } from '@/utils/auth';
import { Button, FormField, Indicator } from '@/components';
import { FORM_CONDITIONS, TOAST_DURATION } from '@/constants';

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
  const { loading, error } = useAuth();
  const { signUp, clearError } = useAuthActions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await signUp({
      email: formState.email.value,
      password: formState.password.value,
      name: formState.name.value,
    });

    if (success) {
      setHasJustLoggedIn(true);
      navigate('/');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { autoClose: TOAST_DURATION.error });
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (loading) return <Indicator />;
  return (
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80 dark:bg-stone-600 dark:text-stone-50">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        회원가입
      </h1>
      <div className="mt-4 flex gap-2 self-center text-sm">
        <p>SNS 계정으로 간편하게 가입해보세요.</p>
        <Link to="/social-login" className="underline">
          간편 가입
        </Link>
      </div>
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
