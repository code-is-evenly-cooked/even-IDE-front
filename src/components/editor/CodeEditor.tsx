"use client";

import {Editor} from "@monaco-editor/react";
import {useIdeStore} from "@/stores/useIdeStore";
import {useState} from "react";
import MemoIndicator from "./MemoLine";

const CodeEditor = () => {
    const {files, currentFileId, updateFileContent} = useIdeStore();
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [monacoInstance, setMonacoInstance] = useState<any>(null);
    const [selectedLine, setSelectedLine] = useState<number | null>(null); // 클릭한 코드 라인

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
        <div className="h-[45vh] min-h-[300px] border-t-[1px] border-t-tonedown min-w-0">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                value={currentFile?.content ?? ""}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    minimap: {enabled: false},
                    automaticLayout: true,
                    glyphMargin: true, // 메모 아이콘 margin 켜기
                }}
                onChange={(value) => {
                    updateFileContent(currentFile.id, value ?? "");
                }}
                onMount={(editor, monaco) => {
                    setEditorInstance(editor);
                    setMonacoInstance(monaco);

                    // 마우스로 클릭한 위치 추적
                    editor.onMouseDown((e) => {
                        if (
                            e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN
                        ) {
                            // 💡 메모 아이콘 마진 클릭은 무시
                            return;
                        }

                        if (e.target.position) {
                            setSelectedLine(e.target.position.lineNumber);
                        }
                    });


                    // 키보드로 커서 이동할 때 위치 추적
                    editor.onDidChangeCursorPosition((e) => {
                        setSelectedLine(e.position.lineNumber);
                    });
                }}
            />

            {/* ✅ 클릭된 라인에만 메모 아이콘 표시 */}
            {editorInstance && monacoInstance && (
                <MemoIndicator
                    editor={editorInstance}
                    monaco={monacoInstance}
                    lineNumber={selectedLine}
                />
            )}
        </div>
    );
};

export default CodeEditor;