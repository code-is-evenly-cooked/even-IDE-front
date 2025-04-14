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

  openFile: (id: string) => void; // 탭에 파일을 추가 및 선택
  closeFile: (id: string) => void; // 탭에서 파일 제거
};

export const useIdeStore = create<IdeStore>((set) => ({
  files: [],
  currentFileId: null,
  openedFileIds: [],

  // 파일 선택
  selectFile: (id) => set({ currentFileId: id }),

  // 코드 변경
  updateFileContent: (id, content) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, content } : file
      ),
    })),

  // 새 파일 추가 + 자동 열기 + 선택
  addFile: (name) => {
    const id = Date.now().toString();
    const newFile = { id, name, content: "" };
    set((state) => ({
      files: [...state.files, newFile],
      openedFileIds: [...state.openedFileIds, id],
      currentFileId: id,
    }));
  },

  // 탭 열기
  openFile: (id) => {
    const { openedFileIds, selectFile } = get();

    // 이미 열려있지 않다면 추가
    if (!openedFileIds.includes(id)) {
      set({ openedFileIds: [...openedFileIds, id] });
    }

    // 선택 상태도 바꿔줌
    selectFile(id);
  },

  // 탭 닫기
  closeFile: (id) => {
    const { openedFileIds, currentFileId, selectFile } = get();

    // 탭에서 제거
    const newOpened = openedFileIds.filter((fid) => fid !== id);
    set({ openedFileIds: newOpened });

    // 현재 열려있던 탭을 닫는 경우 → 이전 탭 선택
    if (currentFileId === id) {
      const fallbackId = newOpened[newOpened.length - 1] || null;
      selectFile(fallbackId);
    }
  },
}));
