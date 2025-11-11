import { SESSION_STORAGE_KEYS } from '@/constants';

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

export { setHasJustLoggedIn, getHasJustLoggedIn, getUserInfo };
