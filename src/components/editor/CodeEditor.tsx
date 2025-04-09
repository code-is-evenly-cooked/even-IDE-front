"use client";

import { Editor } from "@monaco-editor/react";
import { useCodeStore } from "@/stores/useCodeStore";

const CodeEditor = () => {
  const code = useCodeStore((state) => state.code);
  const setCode = useCodeStore((state) => state.setCode);
  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
  };

  return (
    <div className="h-[500px]">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        options={{
          fontSize: 14, // 글자 크기 설정
          minimap: { enabled: false }, // 에디터 우측 미니맵
          automaticLayout: true, // 에디터 반응형 (자동 크기 재조정)
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
