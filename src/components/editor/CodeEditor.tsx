"use client";

import {Editor} from "@monaco-editor/react";
import {useIdeStore} from "@/stores/useIdeStore";
import {useState} from "react";
import MemoIndicator from "./MemoLine";
import { useLanguageStore } from "@/stores/useLanguageStore";

const CodeEditor = () => {
    const {files, currentFileId, updateFileContent} = useIdeStore();
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [monacoInstance, setMonacoInstance] = useState<any>(null);
    const [selectedLine, setSelectedLine] = useState<number | null>(null); // 클릭한 코드 라인
    const [openedMemoLine, setOpenedMemoLine] = useState<number | null>(null);
    const { language } = useLanguageStore();

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
                language={language.toLowerCase()}
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
                        if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
                            if (e.target.position) {
                                const line = e.target.position.lineNumber;
                                setOpenedMemoLine(line);
                            }
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

            {/* ✅ 메모 입력창 표시 */}
            {openedMemoLine !== null && editorInstance && (
                <div
                    className="absolute z-50 bg-gray-800 text-white p-2 rounded shadow-md transition-all duration-150"
                    style={{
                        top: editorInstance.getTopForLineNumber(openedMemoLine) + 30, // 줄의 top 위치 + 살짝 아래로
                        left: 'calc(100% - 280px)',
                    }}
                >
                    ✏️ 메모 입력창 (라인 {openedMemoLine})
                </div>
            )}

            {/* ✅ 클릭된 라인에만 메모 아이콘 표시 */}
            {editorInstance && monacoInstance && (
                <MemoIndicator
                    editor={editorInstance}
                    monaco={monacoInstance}
                    lineNumber={selectedLine}
                    onClickIcon={() => setOpenedMemoLine(selectedLine)}
                />
            )}
        </div>
    );
};

export default CodeEditor;