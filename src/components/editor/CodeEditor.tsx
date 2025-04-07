"use client";

import React from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <div className="h-[500px]">
      <Editor
        height="100%" 
        defaultLanguage="javascript" 
        defaultValue="// 코드 입력" 
        theme="vs-dark" />
    </div>
  );
};

export default CodeEditor;