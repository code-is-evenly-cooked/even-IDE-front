"use client";

import { useMemoStore } from "@/stores/useMemoStore";
import { useIdeStore } from "@/stores/useIdeStore";
import { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { deleteMemoApi } from "@/service/memo";

const MemoList = () => {
    const { memos, deleteMemo } = useMemoStore();
    const { currentFileId } = useIdeStore();
    const [expandedMemoId, setExpandedMemoId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedMemoId((prev) => (prev === id ? null : id));
    };

    const handleDelete = async (memoId: number) => {
        if (!currentFileId) return;
        if (!confirm("정말 이 메모를 삭제할까요?")) return;

        try {
            await deleteMemoApi(projectId, currentFileId, memoId);
            deleteMemo(memoId);
            toast.success("메모 삭제 완료");
        } catch (error) {
            console.error("메모 삭제 실패", error);
            toast.error("메모 삭제 실패");
        }
    };

    // 선택한 파일의 메모만 필터링
    const filteredMemos = memos.filter((memo) => memo.file_id === Number(currentFileId));

    return (
        <div className="flex flex-col gap-4 text-white text-sm">
            {filteredMemos.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                    작성된 메모가 없습니다! 📝
                </div>
            ) : (
                filteredMemos.map((memo) => {
                    const isExpanded = expandedMemoId === memo.id;
                    return (
                        <div
                            key={memo.id}
                            className="bg-gray700 p-2 rounded relative group"
                            onClick={() => toggleExpand(memo.id)}
                        >
                            <div className="text-xs text-gray400 mb-1">
                                {memo.file_name || "파일명 없음"}
                            </div>
                            <div
                                className={clsx(
                                    "whitespace-pre-line break-words transition-all duration-300",
                                    isExpanded ? "line-clamp-none" : "line-clamp-1"
                                )}
                            >
                                {memo.content}
                            </div>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(memo.id);
                                }}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MemoList;