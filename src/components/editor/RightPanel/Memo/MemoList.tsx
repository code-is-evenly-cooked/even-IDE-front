"use client";

import { useMemoStore } from "@/stores/useMemoStore";
import {useEffect, useState} from "react";
import clsx from "clsx";
import { fetchMemos } from "@/service/memo";
import {useIdeStore} from "@/stores/useIdeStore";
import {useProjectStore} from "@/stores/useProjectStore";

const MemoList = () => {
    const { memos, setMemos } = useMemoStore();
    const [expandedMemoId, setExpandedMemoId] = useState<number | null>(null);
    const { currentFileId } = useIdeStore();
    const { projectId } = useProjectStore();

    useEffect(() => {
        if (!projectId || !currentFileId) return;

        const loadMemos = async () => {
            try {
                const data = await fetchMemos({
                    projectId,
                    fileId: currentFileId,
                });
                setMemos(data);
            } catch (error) {
                console.error("메모 조회 실패", error);
            }
        };

        loadMemos();
    }, [projectId, currentFileId, setMemos]);

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
                            {memo.file_name}
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