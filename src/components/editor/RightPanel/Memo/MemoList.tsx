"use client";

import { useMemoStore } from "@/stores/useMemoStore";
import { useIdeStore } from "@/stores/useIdeStore";
import { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { deleteMemoApi, updateMemoApi } from "@/service/memo";
import { useProjectStore } from "@/stores/useProjectStore";

const MemoList = () => {
    const { memos, deleteMemo, updateMemo } = useMemoStore();
    const { currentFileId } = useIdeStore();
    const { projectId } = useProjectStore();

    const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState<string>("");

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

    const handleEditSave = async (memoId: number) => {
        if (!editContent.trim()) {
            toast.error("메모 내용이 비어있습니다.");
            return;
        }

        try {
            await updateMemoApi(projectId, currentFileId, memoId, editContent);
            updateMemo({ id: memoId, content: editContent }); // zustand store 업데이트
            toast.success("메모 수정 완료");
            setEditingMemoId(null);
        } catch (error) {
            console.error("메모 수정 실패", error);
            toast.error("메모 수정 실패");
        }
    };

    const filteredMemos = memos.filter((memo) => memo.file_id === Number(currentFileId));

    return (
        <div className="flex flex-col gap-4 text-white text-sm">
            {filteredMemos.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                    작성된 메모가 없습니다! 📝
                </div>
            ) : (
                filteredMemos.map((memo) => {
                    const isEditing = editingMemoId === memo.id;
                    return (
                        <div
                            key={memo.id}
                            className="bg-gray700 p-2 rounded relative group"
                            onClick={() => {
                                setEditingMemoId(memo.id);
                                setEditContent(memo.content); // 현재 메모 내용 불러오기
                            }}
                        >
                            <div className="text-xs text-gray400 mb-1">
                                {memo.file_name || "파일명 없음"}
                            </div>

                            {isEditing ? (
                                <textarea
                                    autoFocus
                                    className="w-full bg-gray700 text-white rounded p-2 resize-none"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)} // 수정할 때마다 editContent 업데이트
                                    onBlur={() => handleEditSave(memo.id)} // 포커스 아웃 시 저장
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleEditSave(memo.id);
                                        }
                                    }}
                                />
                            ) : (
                                <div
                                    className={clsx(
                                        "whitespace-pre-line break-words transition-all duration-300 line-clamp-1"
                                    )}
                                >
                                    {memo.content}
                                </div>
                            )}

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