'use client';

import { Editor } from '@monaco-editor/react';
import { useCodeStore } from '@/stores/useCodeStore';

const CodeEditor = () => {
  const code = useCodeStore((state) => state.code);
  const setCode = useCodeStore((state) => state.setCode);
  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? '');
  };

  return (
    <div className="h-[500px]">
      <Editor
        height="100%" 
        defaultLanguage="javascript" 
        defaultValue={code}
        theme="vs-dark" 
        onChange={handleEditorChange}
        />
    </div>
  );
};

export default CodeEditor;