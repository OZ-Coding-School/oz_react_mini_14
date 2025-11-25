import { AuthButtons, Button } from '@/components';

function GuestMenu({ isMobileMenuOpen, onToggle }) {
  return (
    <>
      <Button
        type="button"
        variant="icon"
        size="sm"
        className="md:hidden"
        aria-label={
          isMobileMenuOpen
            ? '로그인 및 회원가입 메뉴 닫기'
            : '로그인 및 회원가입 메뉴 열기'
        }
        onClick={onToggle}
      >
        &equiv;
      </Button>
      <div className="hidden md:flex">
        <AuthButtons isMobile={false} />
      </div>
      {isMobileMenuOpen && (
        <div className="absolute -bottom-30 left-0 z-1000 flex flex-col">
          <AuthButtons isMobile={true} onClick={onToggle} />
        </div>
      )}
    </>
  );
}

export default GuestMenu;
