"use client";

import { useIdeStore } from "@/stores/useIdeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { executeCode } from "@/service/code";
import type { Terminal as XtermType } from "xterm";

type RunButtonProps = {
  terminalRef: React.MutableRefObject<XtermType | null>;
};

export default function RunButton({ terminalRef }: RunButtonProps) {
  const { files, currentFileId } = useIdeStore();
  const { language } = useLanguageStore();

  const currentFile = files.find((f) => f.id === currentFileId);
  const code = currentFile?.content ?? "";

  const handleRun = async () => {
    if (!terminalRef.current) return;
    if (!code) {
      terminalRef.current.write("❗ 실행할 코드가 없습니다\r\n");
      return;
    }

    terminalRef.current.clear();
    terminalRef.current.write(`[${language}] 코드 실행 ...\r\n`);

    try {
      const result = await executeCode(language.toLowerCase(), code);
      console.log(result)
      terminalRef.current.write(`결과:\r\n${result.output}\r\n`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        terminalRef.current.write(`오류:\r\n${err.message}\r\n`);
      } else {
        terminalRef.current.write("알 수 없는 오류가 발생했습니다.\r\n");
      }
    }
  };

  return (
    <button
      onClick={handleRun}
      className="w-[100px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow-md transition duration-150"
    >
      실행 ▶
    </button>
  );
}
