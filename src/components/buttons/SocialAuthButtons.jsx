import { cn, setHasJustLoggedIn } from '@/utils';
import { Button } from '@/components';
import { OAUTH_BUTTONS, SocialAuthButtonsMode } from '@/constants';

function SocialAuthButtons({ mode, startAuthProcessing }) {
  const isSignUpMode = mode === SocialAuthButtonsMode.SIGNUP;
  const labelText = isSignUpMode ? '회원가입' : '로그인';

  const handleClick = (action) => {
    startAuthProcessing();
    setTimeout(async () => {
      const { success } = await action();

      if (success) {
        setHasJustLoggedIn(true);
      }
    }, 0);
  };

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
        {OAUTH_BUTTONS.map((btn) => (
          <Button
            key={btn.labelPrefix}
            variant={btn.variant}
            size="full"
            onClick={() => handleClick(btn.onClick)}
            aria-label={`${btn.labelPrefix} ${labelText}`}
          >
            <img
              src={btn.iconSrc}
              alt={`${btn.labelPrefix.slice(0, -4)} 로고`}
              className="mr-2 h-5"
            />
            <span>{`${btn.labelPrefix} ${labelText}`}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SocialAuthButtons;
