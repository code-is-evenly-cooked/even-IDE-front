import clsx from "clsx";
import React, {useRef, useState} from "react";
import {useMemoStore} from "@/stores/useMemoStore";
import {useProjectStore} from "@/stores/useProjectStore";
import {useIdeStore} from "@/stores/useIdeStore";
import {createMemo} from "@/service/memo";
import {ArrowUpIcon} from "lucide-react";
import {toast} from "react-hot-toast";

const MemoInput = () => {
    const [content, setContent] = useState("");
    const textareaRef = useRef(null);
    const {addMemo} = useMemoStore();
    const {projectId} = useProjectStore();
    const {currentFileId, files} = useIdeStore();

    const currentFile = files.find((f) => f.id === currentFileId);
    const currentFileName = currentFile?.name ?? "";
    const disabled = !currentFileName || !currentFileId;

    const handleAdd = async () => {
        if (disabled || !content.trim()) return;

        try {
            const result = await createMemo({
                projectId: projectId!,
                fileId: currentFileId,
                memo: content,
            });

            addMemo({
                id: result.memoId,
                file_id: Number(currentFileId),
                file_name: currentFileName,
                line_number: 1,
                content: result.memo,
                code_snapshot: "",
                created_at: new Date().toISOString(),
                writerId: result.writerId,
                writerNickName: result.writerNickName,
            });

            setContent("");

            toast.success("메모가 추가 되었습니다!")
        } catch (error) {
            console.error("메모 추가 실패", error);
            toast.error("메모 추가에 실패했습니다!");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMac = navigator.platform.includes("Mac");
        const isSaveShortcut = (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

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
          placeholder={disabled ? "파일을 선택하세요!" : "메모를 입력하세요"}
          disabled={disabled}
          className={clsx(
              "w-full px-3 py-2 text-white text-sm font-medium border border-gray700 rounded-2xl resize-none custom-scrollbar",
              "bg-gray900 placeholder:text-gray500 focus:border-violet600 focus:shadow-violetGlow focus:outline-none",
              disabled && "opacity-60 cursor-not-allowed"
          )}
      />
            <button
                type="button"
                onClick={handleAdd}
                disabled={disabled || content.trim() === ""}
                className={clsx(
                    "w-9 h-9 flex items-center justify-center rounded-full transition-colors",
                    disabled || content.trim() === "" ? "bg-gray500/80" : "bg-violet300 hover:bg-violet300/80 text-white"
                )}
            >
                <ArrowUpIcon size={16}/>
            </button>
        </div>
    );
};

export default MemoInput;