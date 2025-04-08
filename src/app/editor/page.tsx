"use client";

import CodeEditor from "@/components/editor/CodeEditor";
import TerminalView from '@/components/editor/Terminal';

export default function EditorPage() {




    return (
        <main className="min-h-screen flex flex-col bg-[#262626]">
            <div className="flex-1">
            <CodeEditor />
            </div>
            <TerminalView />

        </main>
    );
}