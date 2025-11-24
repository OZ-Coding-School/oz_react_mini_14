const getDisplayName = (userId) => {
  if (!userId) return "익명";

  if (userId.includes("@")) {
    const [username] = userId.split("@");
    return username.substring(0, 4) + "****";
  }
  return userId.substring(0, 4) + "****";
};

export default getDisplayName;
