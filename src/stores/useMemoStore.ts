import { create } from "zustand";

type ViewMode = "panel" | "modal";

export interface Memo {
    id: number;
    file_id: number;
    file_name: string;
    line_number: number;
    content: string;
    code_snapshot: string;
    created_at: string;

    writerId?: string;
    writerNickName?: string;
}

interface MemoStore {
    isVisible: boolean;
    viewMode: ViewMode;
    memos: Memo[];
    setVisible: (visible: boolean) => void;
    setViewMode: (mode: ViewMode) => void;
    addMemo: (content: string, fileName: string, fileId: string | null) => void;
}

export const useMemoStore = create<MemoStore>((set) => ({
    isVisible: false,
    viewMode: "panel",
    memos: [], // 초기값 빈 배열로 설정
    setVisible: (visible) => set({ isVisible: visible }),
    setViewMode: (mode) => set({ viewMode: mode }),

    addMemo: (content: string, fileName: string, fileId: string) =>
        set((state) => ({
            memos: [
                ...state.memos,
                {
                    id: Date.now(),
                    file_id: Number(fileId), // fileId는 string → number 변환
                    file_name: fileName,
                    line_number: 1,
                    content,
                    code_snapshot: "",
                    created_at: new Date().toISOString(),
                },
            ],
        })),
}));