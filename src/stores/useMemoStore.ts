import {create} from "zustand";

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
    memos: Memo[];
    setVisible: (visible: boolean) => void;
    setMemos: (memos: Memo[]) => void;
    addMemo: (memo: Memo) => void;
    updateMemo: (memo: { id: number; content: string }) => void;
    deleteMemo: (memoId: number) => void;
}

export const useMemoStore = create<MemoStore>((set) => ({
    isVisible: false,
    memos: [],
    setVisible: (visible) => set({isVisible: visible}),
    setMemos: (memos) => set({memos}),
    addMemo: (memo) => set((state) => ({memos: [memo, ...state.memos]})),
    updateMemo: (updatedMemo) =>
        set((state) => ({
            memos: state.memos.map((m) =>
                m.id === updatedMemo.id ? {...m, content: updatedMemo.content} : m
            ),
        })),
    deleteMemo: (memoId) =>
        set((state) => ({
            memos: state.memos.filter((m) => m.id !== memoId),
        })),
}));