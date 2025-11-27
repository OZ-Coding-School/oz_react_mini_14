import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from '@/hooks';
import { pickFormValues, setHasJustLoggedIn, signUp } from '@/utils';
import { Button, FormField, Indicator, SocialAuthButtons } from '@/components';
import {
  INITIAL_FORM_STATE,
  SIGNUP_FIELDS,
  SocialAuthButtonModes,
  TOAST_DURATION,
} from '@/constants';

function SignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { formState, isFormValid, handleFormChange } = useForm({
    initialState: INITIAL_FORM_STATE.SIGNUP,
  });
  const navigate = useNavigate();

  const startSigningUp = () => setIsSigningUp(true);
  const endSigningUp = () => setIsSigningUp(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startSigningUp();
    const { success, error } = await signUp(pickFormValues({ formState }));
    endSigningUp();

    if (success) {
      setHasJustLoggedIn(true);
      navigate('/');
    }
    if (error) {
      toast.error(error.message, { autoClose: TOAST_DURATION.error });
    }
  };

  if (isSigningUp) return <Indicator />;
  return (
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80 dark:bg-stone-600 dark:text-stone-50">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        회원가입
      </h1>
      <div className="mt-4 flex gap-2 self-center text-sm">
        <p>이미 회원이신가요?</p>
        <Link to="/login" className="underline">
          로그인
        </Link>
      </div>
      <form
        className="mt-10 flex flex-col items-stretch gap-4"
        onSubmit={handleSubmit}
      >
        {SIGNUP_FIELDS.map((field) => (
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
      <SocialAuthButtons
        mode={SocialAuthButtonModes.SIGNUP}
        startAuthProcessing={startSigningUp}
      />
    </section>
  );
}

export default SignUp;
