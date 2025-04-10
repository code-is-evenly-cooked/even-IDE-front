"use client";

import Link from "next/link";
import React from "react";
import RunButton from "@/components/editor/RunButton";

type EditorHeaderProps = {
  onRun: (code: string) => void;
};

const EditorHeader = ({ onRun }: EditorHeaderProps) => {
  return (
    <header className="w-main-area ml-[240px] h-[3rem] flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <button className="text-xl hover:text-gray-300" aria-label="메뉴 열기">
          ☰
        </button>

        <select className="bg-gray-700 text-white text-sm rounded px-2 py-1">
          <option>JavaScript</option>
          <option>TypeScript</option>
          <option>Python</option>
        </select>

        {/* 실행 버튼 */}
        <RunButton onRun={onRun} />
      </div>
      <div className="flex">
        <Link href="/login">
          <span className="text-link">로그인</span>
        </Link>
      </div>
    </header>
  );
};

export default EditorHeader;
