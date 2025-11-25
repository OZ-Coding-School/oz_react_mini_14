import { LinkButton } from '@/components';

function AuthButtons({ isMobile, onClick }) {
  return (
    <>
      <LinkButton
        to="/login"
        variant="stone"
        size={isMobile ? 'screen' : 'md'}
        className={isMobile ? '' : 'mr-1'}
        onClick={onClick}
      >
        로그인
      </LinkButton>
      <LinkButton
        to="/signup"
        variant="stone"
        size={isMobile ? 'screen' : 'md'}
        onClick={onClick}
      >
        회원가입
      </LinkButton>
    </>
  );
}

export default AuthButtons;
