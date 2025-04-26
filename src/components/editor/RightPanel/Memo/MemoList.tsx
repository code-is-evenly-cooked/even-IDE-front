"use client";

import { useMemoStore } from "@/stores/useMemoStore";
import { useState } from "react";
import clsx from "clsx";

const MemoList = () => {
    const { memos } = useMemoStore();
    const [expandedMemoId, setExpandedMemoId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedMemoId(prev => (prev === id ? null : id));
    };

    return (
        <div className="flex flex-col gap-4 text-white text-sm">
            {memos.map((memo) => {
                const isExpanded = expandedMemoId === memo.id;

                return (
                    <div
                        key={memo.id}
                        className="bg-gray700 p-2 rounded cursor-pointer"
                        onClick={() => toggleExpand(memo.id)}
                    >
                        <div className="text-xs text-gray400 mb-1">
                            프로젝트 {memo.line_number}
                        </div>
                        <div
                            className={clsx(
                                "whitespace-pre-line break-words transition-all duration-300",
                                isExpanded ? "line-clamp-none" : "line-clamp-1"
                            )}
                        >
                            {memo.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MemoList;