import { toast } from 'react-toastify';
import { SESSION_STORAGE_KEYS, TOAST_DURATION } from '@/constants';

function setHasJustLoggedIn(value) {
  sessionStorage.setItem(
    SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN,
    JSON.stringify(value),
  );
}

function getHasJustLoggedIn() {
  return JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN),
  );
}

function getUserInfo({ user }) {
  return {
    id: user.id,
    name: user.user_metadata.name,
    email: user.email,
    profileImgUrl: user.user_metadata.avatar_url,
  };
}

async function processLogout({ logOut }) {
  const { success } = await logOut();
  const toastId = toast.loading('로그아웃 중입니다.');

  if (success) {
    toast.update(toastId, {
      render: '로그아웃 되었습니다.',
      type: 'success',
      isLoading: false,
      autoClose: TOAST_DURATION.default,
    });
  }

  return { success };
}

export { setHasJustLoggedIn, getHasJustLoggedIn, getUserInfo, processLogout };
