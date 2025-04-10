"use client";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import EditorHeader from "@/components/layout/Header/EditorHeader";
import { useRef } from "react";
import type { Terminal as XtermType } from "xterm";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("@/components/editor/CodeEditor"), {
  ssr: false,
});
const TerminalView = dynamic(() => import("@/components/editor/Terminal"), {
  ssr: false,
});

export default function EditorPage() {
  const terminalRef = useRef<XtermType | null>(null);
  const handleRun = (code: string) => {
    if (terminalRef.current) {
      terminalRef.current.clear();
      terminalRef.current.write(`\r\n실행한 코드:\r\n${code}\r\n`);
    }
  };

  return (
    <div>
      <EditorHeader onRun={handleRun} />
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <main className="min-h-screen flex flex-col bg-[#262626]">
          <div className="mt-[20px]">
            <CodeEditor />
          </div>
          <TerminalView terminalRef={terminalRef} />
        </main>
      </div>
    </div>
  );
}
