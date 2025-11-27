import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from '@/hooks';
import { logIn, setHasJustLoggedIn } from '@/utils';
import { Button, FormField, Indicator, SocialAuthButtons } from '@/components';
import {
  LOGIN_FIELDS,
  SocialAuthButtonModes,
  TOAST_DURATION,
} from '@/constants';

function LogIn() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { formState, isFormValid, handleFormChange } = useForm({
    initialState: {
      email: { value: '', valid: false },
      password: { value: '', valid: false },
    },
  });
  const navigate = useNavigate();

  const startLoggingIn = () => setIsLoggingIn(true);
  const endLoggingIn = () => setIsLoggingIn(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoggingIn();
    const { success, error } = await logIn({
      email: formState.email.value,
      password: formState.password.value,
    });
    endLoggingIn();

    if (success) {
      setHasJustLoggedIn(true);
      navigate('/');
    }
    if (error) {
      toast.error(error.message, { autoClose: TOAST_DURATION.error });
    }
  };

  if (isLoggingIn) return <Indicator />;
  return (
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80 dark:bg-stone-600 dark:text-stone-50">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        로그인
      </h1>
      <div className="mt-4 flex gap-2 self-center text-sm">
        <p>오즈무비가 처음이신가요?</p>
        <Link to="/signup" className="underline">
          회원가입
        </Link>
      </div>
      <form
        className="mt-10 flex flex-col items-stretch gap-4"
        onSubmit={handleSubmit}
      >
        {LOGIN_FIELDS.map((field) => (
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
      <SocialAuthButtons
        mode={SocialAuthButtonModes.LOGIN}
        startAuthProcessing={startLoggingIn}
      />
    </section>
  );
}

export default LogIn;
