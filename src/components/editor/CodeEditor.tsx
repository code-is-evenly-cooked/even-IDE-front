"use client";

import {Editor} from "@monaco-editor/react";
import {useIdeStore} from "@/stores/useIdeStore";
import {useState} from "react";

const CodeEditor = () => {
    const {files, currentFileId, updateFileContent} = useIdeStore();
    const [editorInstance, setEditorInstance] = useState<any>(null);

    const currentFile = files.find((f) => f.id === currentFileId);

    if (!currentFile) {
        return (
            <div className="h-[45vh] min-h-[300px] flex items-center justify-center text-gray-400">
                파일을 선택해주세요 📄
            </div>
        );
    }

    return (
        <div className="h-[45vh] min-h-[300px] border-t-[1px] border-t-tonedown min-w-0 relative">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                value={currentFile?.content ?? ""}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    minimap: {enabled: false},
                    automaticLayout: true,
                    glyphMargin: true,
                }}
                onChange={(value) => {
                    updateFileContent(currentFile.id, value ?? "");
                }}
                onMount={(editor) => {
                    setEditorInstance(editor);
                }}
            />
        </div>
    );
};

export default CodeEditor;