import { create } from "zustand";

// 공유 프로젝트 타입 정의 (UUID 기반 ID 사용)
export type Project = {
  id: string; // UUID (sharedUUID)
  name: string;
  projectId: number; // 실제 projectId도 함께 저장
};

type ProjectState = {
  projects: Project[]; // 전체 프로젝트 목록
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;

  projectId: number | null; // 선택된 프로젝트의 숫자형 ID
  setProjectId: (id: number) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  // 프로젝트 목록 초기화
  projects: [],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  setProjects: (projects) => set({ projects }),

  // 선택된 프로젝트 ID
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));
