"use client";

import { useMemoStore } from "@/stores/useMemoStore";
import MemoTitle from "./MemoTitle";
import MemoList from "./MemoList";
import MemoInput from "./MemoInput";

const MemoPanel = () => {
    const { isVisible, viewMode } = useMemoStore();

    if (!isVisible || viewMode !== "panel") return null;

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