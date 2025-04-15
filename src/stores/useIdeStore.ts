import { create } from "zustand";

type IdeFile = {
  id: string;
  name: string;
  content: string;
};

type IdeStore = {
  files: IdeFile[];
  currentFileId: string | null;
  openedFileIds: string[]; // 열린 탭의 파일 ID 목록

  selectFile: (id: string) => void;
  updateFileContent: (id: string, newContent: string) => void;
  addFile: (name: string) => void;

  openFile: (id: string) => void;
  closeFile: (id: string) => void;

  currentCode: string;
  setCurrentCode: (code: string) => void;
};

export const useIdeStore = create<IdeStore>((set, get) => ({
  files: [],
  currentFileId: null,
  openedFileIds: [],

  selectFile: (id) => set({ currentFileId: id }),

  updateFileContent: (id, content) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, content } : file
      ),
    })),

  addFile: (name) => {
    const id = Date.now().toString();
    const newFile = { id, name, content: "" };
    set((state) => ({
      files: [...state.files, newFile],
      openedFileIds: [...state.openedFileIds, id],
      currentFileId: id,
    }));
  },

  openFile: (id) => {
    const { openedFileIds, selectFile } = get();
    if (!openedFileIds.includes(id)) {
      set({ openedFileIds: [...openedFileIds, id] });
    }
    selectFile(id);
  },

  closeFile: (id) => {
    const { openedFileIds, currentFileId, selectFile } = get();
    const newOpened = openedFileIds.filter((fid: string) => fid !== id);
    set({ openedFileIds: newOpened });

    if (currentFileId === id) {
      const fallbackId = newOpened[newOpened.length - 1] || null;
      selectFile(fallbackId);
    }
  },

  currentCode: "",
  setCurrentCode: (code) => set({ currentCode: code }),
}));