import { create } from "zustand";

interface userStatus {
  isPremium: boolean;
}

interface UserStatusStore {
  userStatus: userStatus;
  setStatus: (value: boolean) => void;
}

const useUserStatusStore = create<UserStatusStore>((set) => ({
  userStatus: { isPremium: false },
  setStatus: (value) => set(() => ({ userStatus: { isPremium: value } })),
}));

export default useUserStatusStore;
