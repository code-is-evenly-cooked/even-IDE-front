"use client";

import { useMemoStore } from "@/stores/useMemoStore";

const MemoList = () => {
    const {memos} = useMemoStore();

    return (
        <div className="flex flex-col gap-4 text-white text-sm">
            {memos.map((memo) => (
                <div key={memo.id} className="bg-gray700 p-2 rounded">
                    <div className="text-xs text-gray400">라인 {memo.line_number}</div>
                    <div className="mt-1 whitespace-pre-line">{memo.content}</div>
                </div>
            ))}
        </div>
    );
};

export default MemoList;