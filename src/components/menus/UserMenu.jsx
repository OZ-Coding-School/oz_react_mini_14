import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks';
import { GuestMenu, ProfileButton, ProfileMenu } from '@/components';

function UserMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const handleToggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const handleCloseProfileMenu = () => setIsProfileMenuOpen(false);
  const handleToggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (user) handleCloseMobileMenu();
  }, [user]);

  if (isUserLoading)
    return (
      <div className="size-9 animate-pulse overflow-hidden rounded-full bg-stone-500 md:size-10"></div>
    );
  return (
    <>
      {user ? (
        <ProfileButton
          profileImgUrl={user.profileImgUrl}
          isProfileMenuOpen={isProfileMenuOpen}
          onToggle={handleToggleProfileMenu}
        />
      ) : (
        <GuestMenu
          isMobileMenuOpen={isMobileMenuOpen}
          onToggle={handleToggleMobileMenu}
        />
      )}
      {isProfileMenuOpen && <ProfileMenu onClose={handleCloseProfileMenu} />}
    </>
  );
}

export default UserMenu;
