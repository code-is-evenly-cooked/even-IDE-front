"use client";

import { useIdeStore } from "@/stores/useIdeStore";
import { clsx } from "clsx";
import { FolderIcon, FileIcon } from "@/components/common/Icons";
import { useProjectStore } from "@/stores/useProjectStore";
import { getAuthCookie } from "@/lib/cookie";
import { fetchFileContent } from "@/service/file";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useState } from "react";
import { updateProjectName } from "@/service/project";

interface FileExplorerProps {
	onProjectClick: (projectId: string) => void;
	selectedProjectId: string | null;
	onFileNameSubmit: (fileId: string, newName: string) => void;
	onFileClick?: (fileId: string) => void;
	onClearProjectSelection?: () => void;
}

export default function FileExplorer({
	onProjectClick,
	selectedProjectId,
	onFileNameSubmit,
	onFileClick,
	onClearProjectSelection,
}: FileExplorerProps) {
	const {
		files,
		currentFileId,
		openFile,
		editingFileId,
		setEditingFileId,
		deleteFile,
		updateFileContent,
	} = useIdeStore();

	const { setLanguage } = useLanguageStore();
	const { projects, setProjects } = useProjectStore();
	const { accessToken: token } = getAuthCookie();

	const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
	const [newProjectName, setNewProjectName] = useState("");

	const handleClick = (fileId: string) => {
		if (onFileClick) {
			onFileClick(fileId);
		}
	};

	/* 프로젝트 이름 변경 */
	const handleProjectRename = async (projectUUID: string) => {
		const { userId } = getAuthCookie();
		const ownerId = Number(userId);

		const target = projects.find((p) => p.id === projectUUID);
		if (!target) return;

		if (!newProjectName.trim() || newProjectName === target.name || !token) {
			setEditingProjectId(null);
			return;
		}

		try {
			await updateProjectName(target.projectId, newProjectName, ownerId); // API 호출

			const updated = projects.map((p) =>
				p.id === projectUUID ? { ...p, name: newProjectName } : p
			);
			setProjects(updated);
		} catch (err) {
			console.error("🚨 프로젝트 이름 변경 실패", err);
		}

		setEditingProjectId(null); // 수정 모드 종료
	};

	return (
		<div className="flex-1 overflow-y-auto">
			{/* 프로젝트 영역 */}
			<ul className="space-y-1">
				{projects.map((project) => (
					<li key={project.id}>
						{/* 프로젝트 클릭 */}
						<div
							onClick={() => onProjectClick(project.id)}
							onDoubleClick={() => {
								setEditingProjectId(project.id); // 수정 모드 진입
								setNewProjectName(project.name); // 초기값
							}}
							className={clsx(
								"flex text-sm px-3 py-2 cursor-pointer",
								selectedProjectId === project.id
									? "bg-gray500 font-bold"
									: "hover:bg-gray700 text-white"
							)}
						>
							<FolderIcon className="w-5 h-5" />
							{editingProjectId === project.id ? (
								<div className="flex flex-col ml-2 w-full">
									<span className="text-xs font-normal text-white mb-1 ml-1">
										프로젝트 이름 입력
									</span>
									<input
										autoFocus
										value={newProjectName}
										onChange={(e) => setNewProjectName(e.target.value)}
										onBlur={() => handleProjectRename(project.id)}
										onKeyDown={(e) => {
											if (e.key === "Enter") handleProjectRename(project.id);
											if (e.key === "Escape") setEditingProjectId(null);
										}}
										className="px-2 py-1 w-full rounded bg-gray500 text-white text-sm outline-none border-[1px] border-white focus:ring-0"
									/>
								</div>
							) : (
								<span className="ml-3">{project.name}</span>
							)}
						</div>

						{/* 하위 파일들 */}
						<ul>
							{files
								.filter((file) => file.projectId === project.id)
								.map((file) => {
									const numericProjectId = projects.find(
										(p) => p.id === file.projectId
									)?.projectId;

									return editingFileId === file.id ? (
										<li
											key={file.id}
											onClick={() => handleClick(file.id)}
											className="px-8 py-2"
										>
											<div className="text-xs text-gray200 mb-1 ml-1">
												파일 이름 입력
											</div>
											<input
												autoFocus
												type="text"
												defaultValue={file.name}
												onBlur={(e) => {
													const newName = e.currentTarget.value.trim();
													if (newName) {
														onFileNameSubmit(file.id, newName);
													} else {
														deleteFile(file.id);
													}
												}}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														const newName = e.currentTarget.value.trim();
														if (newName) {
															onFileNameSubmit(file.id, newName);
														} else {
															deleteFile(file.id);
														}
													}
													if (e.key === "Escape") {
														deleteFile(file.id);
													}
												}}
												className="w-full rounded bg-gray500 px-2 py-1 text-sm text-white outline-none"
											/>
										</li>
									) : (
										<li
											key={file.id}
											onClick={async () => {
												openFile(file.id);
												setLanguage(file.language);
												if (onClearProjectSelection) onClearProjectSelection();

												if (!numericProjectId) {
													console.warn("프로젝트 ID를 찾을 수 없습니다.");
													return;
												}

												try {
													const result = await fetchFileContent(
														numericProjectId,
														file.id,
														token ?? ""
													);
													updateFileContent(file.id, result.content);
													setLanguage(result.language);
												} catch (err) {
													console.error("파일 내용 불러오기 실패:", err);
												}
											}}
											onDoubleClick={() => setEditingFileId(file.id)}
											className={clsx(
												"flex cursor-pointer px-8 py-2 text-sm transition-colors",
												currentFileId === file.id
													? "bg-gray500 text-white font-bold"
													: "text-white hover:bg-gray700"
											)}
										>
											<FileIcon className="w-5 h-5" />
											<span className="ml-2">{file.name}</span>
										</li>
									);
								})}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}
