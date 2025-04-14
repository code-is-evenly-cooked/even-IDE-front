// src/components/editor/Tabbar.tsx
"use client";

import { useIdeStore } from "@/stores/useIdeStore";
import { X } from "lucide-react";
import clsx from "clsx";

export default function Tabbar() {
  const {
    files,
    currentFileId,
    openedFileIds,
    selectFile,
    closeFile,
  } = useIdeStore();

  return (
    <div className="flex items-end h-[45px] bg-[#1E1E1E] text-white overflow-x-auto px-2">
      {openedFileIds.map((id) => {
        const file = files.find((f) => f.id === id);
        if (!file) return null;

        return (
          <div
            key={id}
            className={clsx(
              "flex items-center h-[35px] px-3 py-1 mr-3 rounded-t-md cursor-pointer text-sm",
              currentFileId === id
                ? "bg-tonedown text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-600"
            )}
            onClick={() => selectFile(id)}
          >
            <span className="mr-6 font-bold">{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(id);
              }}
              className="text-gray-400 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}