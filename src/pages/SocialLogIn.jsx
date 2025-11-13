import { Link } from 'react-router-dom';
import { Button } from '@/components';
import { useAuthActions } from '@/hooks';

const BUTTON_LIST = [
  { label: '카카오계정으로 로그인', action: 'logInWithKakao' },
  { label: '구글계정으로 로그인', action: 'logInWithGoogle' },
];

function SocialLogIn() {
  const actions = useAuthActions();

  return (
    <section className="mx-4 my-12 flex flex-col justify-center rounded-md bg-stone-300 p-4 shadow-md md:mx-14 md:p-10 lg:mx-80 dark:bg-stone-600 dark:text-stone-50">
      <h1 className="mt-10 self-center text-3xl font-bold md:text-4xl">
        간편 가입
      </h1>
      <div className="mt-4 flex gap-2 self-center text-sm">
        <p>이메일로 가입하고 싶으신가요?</p>
        <Link to="/signup" className="underline">
          이메일 회원가입
        </Link>
      </div>
      <ul className="mt-10 mb-4 flex flex-col items-stretch gap-4">
        {BUTTON_LIST.map((btn) => (
          <Button
            key={btn.label}
            type="button"
            variant="stone"
            size="full"
            onClick={actions[btn.action]}
          >
            {btn.label}
          </Button>
        ))}
      </ul>
    </section>
  );
}

export default SocialLogIn;
