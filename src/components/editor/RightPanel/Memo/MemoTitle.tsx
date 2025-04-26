"use client";

import { useMemoStore } from "@/stores/useMemoStore";
import IconButton from "@/components/common/Button/IconButton";
import { CloseIcon } from "@/components/common/Icons";

const MemoTitle = () => {
    const { viewMode, setVisible, setViewMode } = useMemoStore();

    return (
        <div className="p-4 text-md font-semibold text-white text-center flex justify-between items-center">
            {viewMode === "panel" && <span>메모</span>}
            <div className="ml-auto">
                <IconButton
                    icon={<CloseIcon />}
                    label="닫기"
                    size="sm"
                    transparent
                    onClick={() => setVisible(false)}
                />
            </div>
        </div>
    );
};

export default MemoTitle;