"use client";

import CodeEditor from "@/components/editor/CodeEditor";
import TerminalView from "@/components/editor/Terminal";
import RunButton from "@/components/editor/RunButton";

import { useRef } from "react";
import type { Terminal as XtermType } from "xterm";

export default function EditorPage() {
  const terminalRef = useRef<XtermType | null>(null);
  const handleRun = (code: string) => {
    if (terminalRef.current) {
      terminalRef.current.write(`\r\n실행한 코드:\r\n${code}\r\n`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#262626]">
        <RunButton onRun={handleRun} />
      <div className="flex-1">
        <CodeEditor />
      </div>
      <TerminalView terminalRef={terminalRef} />
    </main>
  );
}
