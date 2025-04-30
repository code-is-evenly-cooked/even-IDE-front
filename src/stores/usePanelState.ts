import { create } from "zustand";

export type PanelType = "chat" | "memo" | "ai";

interface PanelState {
	activePanel: PanelType | null;
	togglePanel: (panel: PanelType) => void;
	closePanel: () => void;
}

export const usePanelStore = create<PanelState>((set, get) => ({
	activePanel: null,
	togglePanel: (panel) => {
		const current = get().activePanel;
		set({ activePanel: current === panel ? null : panel });
	},
	closePanel: () => set({ activePanel: null }),
}));
