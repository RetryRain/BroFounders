import { create } from "zustand";

type ToastType = "success" | "error";

interface NotificationState {
  hasUnreadActivity: boolean;
  hasNewTeam: boolean;

  toastOpen: boolean;
  toastType: ToastType;
  toastMessage: string;

  setUnreadActivity: (value: boolean) => void;
  setNewTeam: (value: boolean) => void;

  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  hasUnreadActivity: false,
  hasNewTeam: false,

  toastOpen: false,
  toastType: "success",
  toastMessage: "",

  setUnreadActivity: (value) => set({ hasUnreadActivity: value }),
  setNewTeam: (value) => set({ hasNewTeam: value }),

  showToast: (type, message) =>
    set({
      toastOpen: true,
      toastType: type,
      toastMessage: message,
    }),

  hideToast: () =>
    set({
      toastOpen: false,
    }),
}));
