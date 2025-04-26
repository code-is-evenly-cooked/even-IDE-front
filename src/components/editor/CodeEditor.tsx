"use client";

import { Editor } from "@monaco-editor/react";
import { useIdeStore } from "@/stores/useIdeStore";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { getAuthCookie } from "@/lib/cookie";
import EditLockToggle from "./EditLockToggle";
import { requestToggleEditLock } from "@/service/file";
import { useProjectStore } from "@/stores/useProjectStore";
import type * as monacoEditor from "monaco-editor";

const CodeEditor = () => {
    const { files, currentFileId, updateFileContent, updateEditLock } =
        useIdeStore();
    const { language } = useLanguageStore();
    const { projectId } = useProjectStore();
    const [editorInstance, setEditorInstance] =
        useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

    const currentFile = files.find((f) => f.id === currentFileId);

    const token = getAuthCookie().token;
    const userId = getAuthCookie().userId;

    // 코드 수정 토글
    const handleEditLockToggle = async () => {
        if (!currentFile || !token) return;
        try {
            const res = await requestToggleEditLock({
                projectId: Number(projectId),
                fileId: currentFile.id,
                token: `Bearer ${token}`,
            });
            updateEditLock(currentFile.id, res.editLocked);
        } catch (err) {
            console.error("잠금 토글 실패", err);
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
            {currentFile && (
                <div className="absolute bottom-2 right-4 z-10">
                    <EditLockToggle
                        editLocked={currentFile.editLocked}
                        onToggle={handleEditLockToggle}
                        isOwner={Number(userId) === currentFile.ownerId}
                    />
                </div>
            )}
            <Editor
                height="100%"
                language={language.toLowerCase()}
                value={currentFile?.content ?? ""}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                    glyphMargin: true,
                    readOnly:
                        currentFile.editLocked && currentFile.ownerId !== Number(userId),
                }}
                onChange={(value) => {
                    if (!currentFile.editLocked) {
                        updateFileContent(currentFile.id, value ?? "");
                    }
                }}
                onMount={(editor, monaco) => {
                    setEditorInstance(editor);

                    editor.onMouseDown((e) => {
                        if (
                            e.target.type ===
                            monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN
                        ) {
                            return;
                        }
                    });
                }}
            />
        </div>
    );
};

export default CodeEditor;