import { create } from "zustand";

type IdeFile = {
    id: string;
    name: string;
    content: string;
    projectId: string;

    language: string;
    updatedAt: string;
    ownerId: number;
    locked: boolean;
    editLocked: boolean;
};

type IdeStore = {
    files: IdeFile[];
    currentFileId: string | null;
    openedFileIds: string[]; // 열린 탭의 파일 ID 목록
    setFiles: (files: IdeFile[]) => void;

    selectFile: (id: string | null) => void;
    updateFileContent: (id: string, newContent: string) => void;
    addFile: (name: string, projectId: string, ownerId: number, id?: string) => void;
    deleteFile: (id: string) => void;

    editingFileId: string | null;
    setEditingFileId: (id: string | null) => void;
    renameFile: (id: string, newName: string) => void;

    openFile: (id: string) => void;
    closeFile: (id: string) => void;

    currentCode: string;
    setCurrentCode: (code: string) => void;
};

export const useIdeStore = create<IdeStore>()(
    (set, get) => ({
        files: [],
        currentFileId: null,
        openedFileIds: [],

        setFiles: (files) => set({ files }),

        // 파일 선택
        selectFile: (id) => set({ currentFileId: id }),

        // 파일 내용 수정 (코드 입력 시 호출)
        updateFileContent: (id, content) =>
            set((state) => ({
                files: state.files.map((file) =>
                    file.id === id ? { ...file, content } : file
                ),
            })),

        // 새 파일 생성 -> 자동으로 탭 열기 + 선택 상태
        addFile: (name: string, projectId: string, ownerId: number, id = Date.now().toString()) => {
            const newFile: IdeFile = {
                id,
                name,
                content: "",
                projectId,
                language: "javascript",
                updatedAt: new Date().toISOString(),
                ownerId,
                locked: false,
                editLocked: false,
            };
            set((state) => ({
                files: [...state.files, newFile],
                openedFileIds: [...state.openedFileIds, id],
                currentFileId: id,
            }));
        },

        // 파일 탭 열기 (중복 방지) + 선택 상태 전환
        openFile: (id) => {
            const { openedFileIds, selectFile } = get();
            if (!openedFileIds.includes(id)) {
                set({ openedFileIds: [...openedFileIds, id] });
            }
            selectFile(id);
        },

        // 파일 탭 닫기 + 이전 탭 이동
        closeFile: (id) => {
            const { openedFileIds, currentFileId, selectFile } = get();
            const newOpened = openedFileIds.filter((fid: string) => fid !== id);
            set({ openedFileIds: newOpened });

            if (currentFileId === id) {
                const fallbackId = newOpened[newOpened.length - 1] || null;
                selectFile(fallbackId);
            }
        },

        // 파일 이름 변경
        editingFileId: null,
        setEditingFileId: (id) => set({ editingFileId: id }),

        renameFile: (id, newName) =>
            set((state) => ({
                files: state.files.map((file) =>
                    file.id === id ? { ...file, name: newName } : file
                ),
                editingFileId: null,
            })),

        // 파일 삭제
        deleteFile: (id: string) => {
            const { files, openedFileIds, currentFileId } = get();
            const newFiles = files.filter((file) => file.id !== id);
            const newOpened = openedFileIds.filter((fid) => fid !== id);
            const newCurrent =
                currentFileId === id
                    ? newOpened[newOpened.length - 1] || null
                    : currentFileId;
            set({
                files: newFiles,
                openedFileIds: newOpened,
                currentFileId: newCurrent,
            });
        },

        // 현재 코드 값 저장 (Monaco Editor 외부에서도 접근 가능)
        currentCode: "",
        setCurrentCode: (code) => set({ currentCode: code }),
    }),
);