import { create } from "zustand";

type IdeFile = {
  id: string;
  name: string;
  content: string;
};

type IdeStore = {
  files: IdeFile[];
  currentFileId: string | null;
  selectFile: (id: string) => void;
  updateFileContent: (id: string, newContent: string) => void;
  addFile: (name: string) => void;
};

export const useIdeStore = create<IdeStore>((set) => ({
  files: [],
  currentFileId: null,
  selectFile: (id) => set({ currentFileId: id }),
  updateFileContent: (id, content) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, content } : file
      ),
    })),
  addFile: (name) =>
    set((state) => ({
      files: [...state.files, { id: Date.now().toString(), name, content: "" }],
    })),
}));
