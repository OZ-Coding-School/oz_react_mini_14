function getUserInfo({ user }) {
  return {
    id: user.id,
    name: user.user_metadata.name,
    email: user.email,
    profileImgUrl: user.user_metadata.avatar_url,
  };
}

export default getUserInfo;
