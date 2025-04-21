import { create } from 'zustand'

type Memo = {
    id: number
    file_id: number
    line_number: number
    content: string
    code_snapshot: string
    created_at: string
}

type MemoStore = {
    memos: Memo[]
    setMemos: (newMemos: Memo[]) => void
}

export const useMemoStore = create<MemoStore>((set) => ({
    memos: [],
    setMemos: (newMemos) => set({ memos: newMemos }),
}))