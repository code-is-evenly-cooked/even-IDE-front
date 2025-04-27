"use client";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { useEffect, useRef } from "react";
import type { Terminal as XtermType } from "xterm";
import dynamic from "next/dynamic";
import Tabbar from "@/components/editor/Tabbar";
import Toolbox from "@/components/editor/Toolbox/Toolbox";
import RightPanel from "@/components/editor/RightPanel/RightPanel";
import { useProjectStore } from "@/stores/useProjectStore";
import { fetchAllProjects } from "@/service/project";
import { useIdeStore } from "@/stores/useIdeStore";

const CodeEditor = dynamic(() => import("@/components/editor/CodeEditor"), {
	ssr: false,
});
const TerminalView = dynamic(() => import("@/components/editor/Terminal"), {
	ssr: false,
});

export type FileResponse = {
	id: number;
	name: string;
	content?: string;
	language?: string;
	updatedAt?: string;
	ownerId?: number;
	locked: boolean;
	editLocked: boolean;
};

export type ProjectResponse = {
	id: number;
	projectId?: number;
	projectName: string;
	sharedUUID: string;
	createdAt: string;
	ownerId: number;
	files: FileResponse[];
};

export default function EditorPage() {
	const terminalRef = useRef<XtermType | null>(null);
	const { setProjects, setProjectId } = useProjectStore();
	const { setFiles } = useIdeStore();

	useEffect(() => {
		fetchAllProjects()
			.then((data) => {
				const projectList = data.map((project: ProjectResponse) => ({
					id: project.sharedUUID,
					name: project.projectName,
					projectId: project.id,
				}));
				setProjects(projectList);

				const allFiles = data.flatMap((project: ProjectResponse) =>
					project.files.map((file: FileResponse) => ({
						id: String(file.id),
						name: file.name,
						content: "", // ❗️ GET /editor는 content가 없음
						projectId: project.sharedUUID,
						language: "javascript", // 기본값
						updatedAt: new Date().toISOString(),
						ownerId: project.ownerId,
						locked: file.locked,
						editLocked: file.editLocked,
					}))
				);

				setFiles(allFiles);

				if (projectList.length > 0) {
					setProjectId(projectList[0].projectId);
				}
			})
			.catch((err) => {
				console.error("❌ 프로젝트 목록 조회 실패:", err);
			});
	}, [setProjects, setFiles, setProjectId]);

	return (
		<div>
			<div className="flex h-screen">
				<Sidebar />
				<div className="flex flex-1 flex-col min-w-0">
					<Header
						terminalRef={terminalRef as React.MutableRefObject<XtermType>}
					/>
					<div className="flex min-h-0">
						<main className="min-w-0 overflow-x-hidden flex flex-1 flex-col bg-gray700">
							<div className="flex flex-col flex-1 min-w-0">
								<Tabbar />
								<CodeEditor />
							</div>
							<div className="mt-[20px]">
								<TerminalView terminalRef={terminalRef} />
							</div>
						</main>
						<RightPanel />
						<Toolbox />
					</div>
				</div>
			</div>
		</div>
	);
}
