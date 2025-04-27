"use client";

import { useEffect } from "react";
import { useMemoStore } from "@/stores/useMemoStore";
import MemoTitle from "./MemoTitle";
import MemoList from "./MemoList";
import MemoInput from "./MemoInput";
import { fetchMemos } from "@/service/memo";
import { useProjectStore } from "@/stores/useProjectStore";
import { useIdeStore } from "@/stores/useIdeStore";

const MemoPanel = () => {
    const { isVisible, setMemos } = useMemoStore();
    const { projectId } = useProjectStore();
    const { currentFileId } = useIdeStore();

    if (!isVisible) return null;

    useEffect(() => {
        if (isVisible && projectId && currentFileId) {
            (async () => {
                try {
                    const memos = await fetchMemos(projectId, currentFileId);
                    setMemos(memos);
                } catch (error) {
                    console.error("메모 목록 불러오기 실패", error);
                }
            })();
        }
    }, [isVisible, projectId, currentFileId]);

    return (
        <aside className="w-[320px] h-full bg-gray800 border-none flex flex-col">
            <MemoTitle />
            <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
                <MemoList />
            </div>
            <MemoInput />
        </aside>
    );
};

export default MemoPanel;