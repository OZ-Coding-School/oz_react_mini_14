import { Button } from '@/components';

function ProfileButton({ profileImgUrl, isProfileMenuOpen, onToggle }) {
  return (
    <Button
      type="button"
      variant="profile"
      aria-label={
        isProfileMenuOpen
          ? '찜 목록 및 로그아웃 메뉴 닫기'
          : '찜 목록 및 로그아웃 메뉴 열기'
      }
      onClick={onToggle}
    >
      <img
        src={profileImgUrl}
        alt="유저의 프로필 이미지"
        aria-hidden={true}
        className="size-full object-cover object-center"
      />
    </Button>
  );
}

export default ProfileButton;
