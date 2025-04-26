"use client";

import { useState } from "react";
import { useMemoStore } from "@/stores/useMemoStore";

const MemoInput = () => {
    const [content, setContent] = useState("");
    const { addMemo } = useMemoStore();

    const handleAdd = () => {
        if (!content.trim()) return;
        addMemo(content);
        setContent("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isSaveShortcut =
            (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

        if (isSaveShortcut) {
            e.preventDefault(); // 브라우저 기본 저장 방지
            handleAdd();
        }
    };

    return (
        <div className="p-2 border-t border-gray700">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메모를 입력하세요"
                className="w-full h-20 p-2 text-sm text-white bg-gray800 border border-gray700 rounded resize-none"
            />
            <button
                onClick={handleAdd}
                className="mt-2 px-3 py-1 bg-primary rounded text-white text-sm hover:bg-primary-dark"
            >
                추가
            </button>
        </div>
    );
};

export default MemoInput;