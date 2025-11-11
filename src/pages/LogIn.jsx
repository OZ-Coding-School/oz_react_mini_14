import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth, useAuthActions, useForm } from '@/hooks';
import { Button, FormField, Indicator } from '@/components';
import { ERROR_TOAST_DURATION, FORM_CONDITIONS } from '@/constants';

const FIELD_LIST = [
  {
    label: '이메일',
    type: 'email',
    name: 'email',
    conditions: FORM_CONDITIONS.EMAIL,
  },

  {
    label: '비밀번호',
    type: 'password',
    name: 'password',
    conditions: FORM_CONDITIONS.PASSWORD,
  },
];

function LogIn() {
  const { formState, isFormValid, handleFormChange } = useForm({
    initialState: {
      email: { value: '', valid: false },
      password: { value: '', valid: false },
    },
  });
  const { user, loading, error } = useAuth();
  const { logIn, clearError } = useAuthActions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn({
      email: formState.email.value,
      password: formState.password.value,
    });
  };

  useEffect(() => {
    if (user) {
      toast.success('로그인에 성공하였습니다.');
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
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80 dark:bg-stone-600 dark:text-stone-50">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        로그인
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
          로그인
        </Button>
      </form>
      <div className="mt-4 flex gap-2 self-center text-sm">
        <p>오즈무비가 처음이신가요?</p>
        <Link className="underline">간편 가입</Link>
      </div>
    </section>
  );
}

export default LogIn;
