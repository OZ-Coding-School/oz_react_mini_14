import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions, useForm } from '@/hooks';
import { setHasJustLoggedIn } from '@/utils';
import { Button, FormField, Indicator, SocialAuthButtons } from '@/components';
import { SIGNUP_FIELDS, SocialAuthButtonsMode } from '@/constants';

function SignUp() {
  const { formState, isFormValid, handleFormChange } = useForm({
    initialState: {
      email: { value: '', valid: false },
      name: { value: '', valid: false },
      password: { value: '', valid: false },
      passwordConfirm: { value: '', valid: false, pair: 'password' },
    },
  });
  const { loading } = useAuth();
  const { signUp } = useAuthActions();
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

  if (loading) return <Indicator />;
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
      <SocialAuthButtons mode={SocialAuthButtonsMode.SIGNUP} />
    </section>
  );
}

export default SignUp;
