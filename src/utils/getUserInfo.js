function getUserInfo({ user }) {
  return {
    id: user.id,
    name: user.user_metadata.name,
    email: user.email,
  };
}

export default getUserInfo;
