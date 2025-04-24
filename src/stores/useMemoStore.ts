import { create } from "zustand";

type ViewMode = "panel" | "modal";

interface MemoStore {
    isVisible: boolean;
    viewMode: ViewMode;
    setVisible: (visible: boolean) => void;
    setViewMode: (mode: ViewMode) => void;
}

export const useMemoStore = create<MemoStore>((set) => ({
    isVisible: false,
    viewMode: "panel",
    setVisible: (visible) => set({ isVisible: visible }),
    setViewMode: (mode) => set({ viewMode: mode }),
}));