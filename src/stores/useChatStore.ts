import { create } from "zustand";

export type ChatViewMode = "panel" | "modal";

interface ChatState {
	isVisible: boolean;
	viewMode: ChatViewMode;
	toggleVisibility: () => void;
	setViewMode: (mode: ChatViewMode) => void;
}

export const useChatStore = create<ChatState>((set) => ({
	isVisible: true,
	viewMode: "panel",
	toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
	setViewMode: (mode) => set({ viewMode: mode }),
}));
