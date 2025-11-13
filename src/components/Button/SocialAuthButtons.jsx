import { useAuthActions } from '@/hooks';
import { cn } from '@/utils';
import { Button } from '@/components';
import { SocialAuthButtonsMode } from '@/constants';

const BUTTON_LIST = [
  {
    labelPrefix: '카카오계정으로',
    variant: 'oauth-kakao',
    iconSrc: '/images/oauth/kakao.svg',
    actionKey: 'logInWithKakao',
  },
  {
    labelPrefix: '구글계정으로',
    variant: 'oauth-google',
    iconSrc: '/images/oauth/google.svg',
    actionKey: 'logInWithGoogle',
  },
];

function SocialAuthButtons({ mode }) {
  const actions = useAuthActions();
  const isSignUpMode = mode === SocialAuthButtonsMode.SIGNUP;
  const labelText = isSignUpMode ? '회원가입' : '로그인';

  return (
    <div className="flex-center mt-15 flex-col items-stretch">
      <hr
        aria-label={`다른 방법으로 ${labelText}`}
        className={cn(
          'h-3.5 overflow-visible border-t border-t-stone-950 text-center text-sm after:relative after:-top-3 after:bg-stone-300 after:px-4 dark:border-t-stone-200 dark:after:bg-stone-600',
          {
            'after:content-["다른_방법으로_회원가입"]': isSignUpMode,
            'after:content-["다른_방법으로_로그인"]': !isSignUpMode,
          },
        )}
      />
      <div className="mt-6 flex flex-col gap-3">
        {BUTTON_LIST.map((btn) => (
          <Button
            key={btn.labelPrefix}
            variant={btn.variant}
            size="full"
            onClick={actions[btn.actionKey]}
          >
            <img
              src={btn.iconSrc}
              alt=""
              aria-hidden={true}
              className="mr-2 h-5"
            />
            <p>{`${btn.labelPrefix} ${labelText}`}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SocialAuthButtons;
