"use client";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { useRef } from "react";
import type { Terminal as XtermType } from "xterm";
import dynamic from "next/dynamic";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Tabbar from "@/components/editor/Tabbar";

const CodeEditor = dynamic(() => import("@/components/editor/CodeEditor"), {
  ssr: false,
});
const TerminalView = dynamic(() => import("@/components/editor/Terminal"), {
  ssr: false,
});

export default function EditorPage() {
  const terminalRef = useRef<XtermType | null>(null);

  const language = useLanguageStore((state) => state.language);

  const handleRun = (code: string) => {
    if (!terminalRef.current) return;

    terminalRef.current.clear();

    if (language === "JavaScript") {
      try {
        const result = eval(code); // 코드 실행

        terminalRef.current.write(`\r\n[결과] ${String(result)}\r\n`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          terminalRef.current.write(`\r\n[오류] ${error.message}\r\n`);
        } else {
          terminalRef.current.write(`\r\n[오류] 알 수 없는 오류입니다\r\n`);
        }
      }
    } else {
      // 지원되지 않는 언어에 대한 메시지
      terminalRef.current.write(`\r\n[아직 지원되지 않는 언어입니다]\r\n`);
    }
  };

  return (
    <div>
      <Header onRun={handleRun} />
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <main className="min-h-screen flex flex-col bg-[#262626]">
          <div>
            <Tabbar />
            <CodeEditor />
          </div>
          <div className="mt-[20px]">
            <TerminalView terminalRef={terminalRef} />
          </div>
        </main>
        <div className="w-[280px] bg-black"></div>
        <div className="flex flex-col">
          <button>A</button>
          <button>B</button>
          <button>C</button>
        </div>
      </div>
    </div>
  );
}
