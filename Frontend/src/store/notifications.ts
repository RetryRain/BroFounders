import { create } from "zustand";

interface NotificationState {
  hasUnreadActivity: boolean;
  hasNewTeam: boolean;
  setUnreadActivity: (value: boolean) => void;
  setNewTeam: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  hasUnreadActivity: false,
  hasNewTeam: false,

  setUnreadActivity: (value) => set({ hasUnreadActivity: value }),
  setNewTeam: (value) => set({ hasNewTeam: value }),
}));
