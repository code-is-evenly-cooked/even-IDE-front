"use client";

import { Editor } from "@monaco-editor/react";
import { useIdeStore } from "@/stores/useIdeStore";
import { useContext, useEffect, useRef, useState } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { createPortal } from "react-dom";
import type * as monacoEditor from "monaco-editor";
import MemoIndicator from "./MemoLine";
import { getAuthCookie } from "@/lib/cookie";
import EditLockToggle from "./EditLockToggle";
import { requestToggleEditLock } from "@/service/file";
import { useProjectStore } from "@/stores/useProjectStore";
import { ChatContext } from "@/providers/ChatProvider";

const CodeEditor = () => {
	const { files, currentFileId, updateFileContent, updateEditLock } =
		useIdeStore();
	const { language } = useLanguageStore();
	const { projectId } = useProjectStore();
	const [editorInstance, setEditorInstance] =
		useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
	const [monacoInstance, setMonacoInstance] = useState<
		typeof monacoEditor | null
	>(null);
	const [selectedLine, setSelectedLine] = useState<number | null>(null);
	const [openedMemoLine, setOpenedMemoLine] = useState<number | null>(null);
	const [memoContent, setMemoContent] = useState<string>("");
	const memoRef = useRef<HTMLDivElement | null>(null);

	const currentFile = files.find((f) => f.id === currentFileId);

	const { accessToken: token, userId } = getAuthCookie();

	const chatContext = useContext(ChatContext);
	const sendCodeUpdate = chatContext?.sendCodeUpdate;

	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

	// const handleIconClick = () => {
	//     console.log("🧠 메모 아이콘 클릭 selectedLine:", selectedLine, "openedMemoLine:", openedMemoLine);
	//     if (openedMemoLine === selectedLine) {
	//         setOpenedMemoLine(null); // toggle off
	//     } else {
	//         setOpenedMemoLine(selectedLine); // toggle on
	//     }
	// };

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
						// 디바운스 적용
						if (typingTimeoutRef.current) {
							clearTimeout(typingTimeoutRef.current);
						}

						typingTimeoutRef.current = setTimeout(() => {
							if (sendCodeUpdate && value !== undefined) {
								sendCodeUpdate(value);
							}
						}, 500);
					}
				}}
				onMount={(editor, monaco) => {
					setEditorInstance(editor);
					setMonacoInstance(monaco);

					editor.onMouseDown((e) => {
						if (
							e.target.type ===
							monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN
						) {
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
			{openedMemoLine !== null &&
				editorInstance &&
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
				)}

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
