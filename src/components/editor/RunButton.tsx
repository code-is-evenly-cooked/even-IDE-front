"use client";

import { useIdeStore } from "@/stores/useIdeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

type RunButtonProps = {
  onRun: (code: string, language: string) => void;
};

export default function RunButton({ onRun }: RunButtonProps) {
  const { files, currentFileId } = useIdeStore();
  const { language } = useLanguageStore();

  const currentFile = files.find((f) => f.id === currentFileId);
  const code = currentFile?.content ?? "";

  return (
    <button
      onClick={() => onRun(code, language)} // 파일의 코드 전달
      className="w-[100px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow-md transition duration-150"
    >
      실행 ▶
    </button>
  );
}
