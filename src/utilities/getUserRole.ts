const getUserRole = async (userId: string | undefined) => {
  return userId === import.meta.env.VITE_ADMIN_UID;
};

export default getUserRole;
