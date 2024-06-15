import { create } from "zustand";

interface userStatus {
  isPremium: boolean;
  isAdmin: boolean;
}

interface UserStatusStore {
  userStatus: userStatus;
  setStatus: (isPremium: boolean) => void;
  setRole: (isAdmin: boolean) => void;
}

// Create the user status store
const useUserStatusStore = create<UserStatusStore>((set) => ({
  userStatus: { isPremium: false, isAdmin: false },
  setStatus: (isPremium) =>
    set((state) => ({
      userStatus: { ...state.userStatus, isPremium: isPremium },
    })),
  setRole: (isAdmin) =>
    set((state) => ({ userStatus: { ...state.userStatus, isAdmin: isAdmin } })),
}));

export default useUserStatusStore;
