"use client";

import { useState, useRef } from "react";
import { useMemoStore } from "@/stores/useMemoStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useIdeStore } from "@/stores/useIdeStore";
import { ArrowUpIcon } from "lucide-react";
import clsx from "clsx";

const MemoInput = () => {
    const [content, setContent] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { addMemo } = useMemoStore();
    const { currentFileId, files } = useIdeStore();
    const currentFile = files.find((f) => f.id === currentFileId);
    const currentFileName = currentFile?.name ?? null;
    const currentFileIdStr = currentFile?.id ?? null;
    const { projectId } = useProjectStore();
    const disabled = !currentFileName;

    const handleAdd = () => {
        const handleAdd = () => {
            if (!content.trim() || !currentFileIdStr || !currentFileName) return;
            addMemo(content, currentFileName, currentFileIdStr);
            setContent("");
        };
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMac = navigator.platform.toUpperCase().includes("MAC");
        const isSaveShortcut =
            (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

        if (isSaveShortcut) {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="p-4 flex items-end gap-2">
            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={
                    disabled ? "파일을 선택해주세요!" : "메모를 입력하세요"
                }
                disabled={disabled}
                className={clsx(
                    `
					w-full px-3 py-2 text-white text-body-2 font-medium
					border border-gray700 rounded-2xl resize-none
					scrollbar-thumb-gray600 scrollbar-track-transparent scrollbar-thin
					placeholder:text-gray500 bg-gray900
					focus:border-violet600 focus:shadow-violetGlow focus:outline-none focus:ring-0
					transition-colors duration-200
					`,
                    disabled && "opacity-60 cursor-not-allowed"
                )}
            />
            <button
                type="button"
                onClick={handleAdd}
                disabled={disabled || content.trim() === ""}
                className={clsx(
                    `
					w-11 h-9 flex items-center justify-center rounded-full transition-colors
					`,
                    disabled || content.trim() === ""
                        ? "bg-gray500/80 text-white cursor-not-allowed"
                        : "bg-violet300 hover:bg-violet300/80 text-white"
                )}
            >
                <ArrowUpIcon size={16} />
            </button>
        </div>
    );
};

export default MemoInput;