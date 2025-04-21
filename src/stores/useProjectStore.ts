import { create } from "zustand";

interface ProjectState {
	projectId: number | null;
	setProjectId: (id: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
	projectId: null,
	setProjectId: (id) => set({ projectId: id }),
}));
