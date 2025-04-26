import { create } from "zustand";

type ViewMode = "panel" | "modal";

export interface Memo {
    id: number;
    file_id: number;
    line_number: number;
    content: string;
    code_snapshot: string;
    created_at: string;
}

interface MemoStore {
    isVisible: boolean;
    viewMode: ViewMode;
    memos: Memo[];
    setVisible: (visible: boolean) => void;
    setViewMode: (mode: ViewMode) => void;
    addMemo: (content: string) => void;
}

export const useMemoStore = create<MemoStore>((set) => ({
    isVisible: false,
    viewMode: "panel",
    memos: [], // 초기값 빈 배열로 설정
    setVisible: (visible) => set({ isVisible: visible }),
    setViewMode: (mode) => set({ viewMode: mode }),

    addMemo: (content) =>
        set((state) => ({
            memos: [
                ...state.memos,
                {
                    id: Date.now(), // 간단한 임시 ID
                    file_id: 1,
                    line_number: 1,
                    content,
                    code_snapshot: "",
                    created_at: new Date().toISOString(),
                },
            ],
        })),
}));