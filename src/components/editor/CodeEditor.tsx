"use client";

import { Editor } from "@monaco-editor/react";
import { useIdeStore } from "@/stores/useIdeStore";

const CodeEditor = () => {
  const { files, currentFileId, updateFileContent } = useIdeStore();

  const currentFile = files.find((f) => f.id === currentFileId);

  // 파일이 선택되지 않았을 때 메시지
  if (!currentFile) {
    return (
      <div className="h-[45vh] min-h-[300px] flex items-center justify-center text-gray-400">
        파일을 선택해주세요 📄
      </div>
    );
  }

  return (
    <div className="h-[45vh] min-h-[300px] border-t-[1px] border-t-tonedown">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={currentFile?.content ?? ""}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        onChange={(value) => {
          updateFileContent(currentFile.id, value ?? "");
        }}
      />
    </div>
  );
};

export default CodeEditor;
