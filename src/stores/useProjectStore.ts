import { create } from "zustand";
import { nanoid } from "nanoid";

export type Project = {
  id: string;
  name: string;
};

type ProjectState = {
  projects: Project[];
  addProject: (name: string) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  addProject: (name: string) =>
    set((state) => ({
      projects: [...state.projects, { id: nanoid(), name }],
    })),
}));
