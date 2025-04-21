import { create } from "zustand";

export type Project = {
  id: string;  // shareUUID
  name: string;
};

type ProjectState = {
  projects: Project[];
  addProject: (project: Project) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));