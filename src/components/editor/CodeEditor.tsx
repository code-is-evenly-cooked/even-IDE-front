"use client";

import {Editor} from "@monaco-editor/react";
import {useIdeStore} from "@/stores/useIdeStore";
import {useEffect, useRef, useState} from "react";
import MemoIndicator from "./MemoLine";
import { useLanguageStore } from "@/stores/useLanguageStore";
import {createPortal} from "react-dom";

const CodeEditor = () => {
    const {files, currentFileId, updateFileContent} = useIdeStore();
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [monacoInstance, setMonacoInstance] = useState<any>(null);
    const [selectedLine, setSelectedLine] = useState<number | null>(null); // 클릭한 코드 라인
    const [openedMemoLine, setOpenedMemoLine] = useState<number | null>(null);
    const { language } = useLanguageStore();
    const [memoContent, setMemoContent] = useState<string>("");
    const memoRef = useRef<HTMLDivElement | null>(null);

    const currentFile = files.find((f) => f.id === currentFileId);

    // 외부 클릭 감지하여 메모창 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (memoRef.current && !memoRef.current.contains(event.target as Node)) {
                setOpenedMemoLine(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleIconClick = () => {
        console.log("🧠 메모 아이콘 클릭 selectedLine:", selectedLine, "openedMemoLine:", openedMemoLine);
        if (openedMemoLine === selectedLine) {
            setOpenedMemoLine(null); // toggle off
        } else {
            setOpenedMemoLine(selectedLine); // toggle on
        }
    };

    // 파일이 선택되지 않았을 때 메시지
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
                language={language.toLowerCase()}
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
                onMount={(editor, monaco) => {
                    setEditorInstance(editor);
                    setMonacoInstance(monaco);

                    editor.onMouseDown((e) => {
                        if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
                            return;
                        }

                        if (e.target.position) {
                            setSelectedLine(e.target.position.lineNumber);
                        }
                    });

                    editor.onDidChangeCursorPosition((e) => {
                        setSelectedLine(e.position.lineNumber);
                    });
                }}
            />

            {/* 메모 입력창 */}
            {openedMemoLine !== null && editorInstance &&
                createPortal(
                    <div
                        ref={memoRef}
                        className="fixed z-50 bg-gray-800 text-white p-3 rounded shadow-md w-64"
                        style={{
                            top: editorInstance.getTopForLineNumber(openedMemoLine) + 30,
                            left: window.innerWidth - 300,
                        }}
                    >
                        <div className="text-sm mb-2">라인 {openedMemoLine} 메모</div>
                        <textarea
                            value={memoContent}
                            onChange={(e) => setMemoContent(e.target.value)}
                            className="w-full h-20 p-2 rounded bg-gray-700 text-white resize-none focus:outline-none"
                            placeholder="메모를 입력하세요"
                        />
                    </div>,
                    document.body
                )
            }

            {/* 클릭된 라인에만 메모 아이콘 표시 */}
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