"use client";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import { useRef, useEffect } from "react";
import type { Terminal as XtermType } from "xterm";
import dynamic from "next/dynamic";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Tabbar from "@/components/editor/Tabbar";
import Toolbox from "@/components/editor/Toolbox/Toolbox";
import RightPanel from "@/components/editor/RightPanel/RightPanel";
import { getAuthCookie } from "@/lib/cookie";
import { fetchProject } from "@/service/project";
import { useProjectStore } from "@/stores/useProjectStore";
import { useIdeStore } from "@/stores/useIdeStore";
import type { FileItem } from "@/types/file";
import { useParams } from "next/navigation";

const CodeEditor = dynamic(() => import("@/components/editor/CodeEditor"), {
  ssr: false,
});
const TerminalView = dynamic(() => import("@/components/editor/Terminal"), {
  ssr: false,
});

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.uuid as string;
  const terminalRef = useRef<XtermType | null>(null);
  const language = useLanguageStore((state) => state.language);
  const { setProjects, setProjectId } = useProjectStore();
  const { setFiles } = useIdeStore();

  // 로그인 사용자 여부 확인 콘솔 (임시)
  useEffect(() => {
    const auth = getAuthCookie();
    const token = auth?.token ?? undefined;
  
    if (token) {
      console.log("🔐 로그인된 사용자입니다.");
    } else {
      console.log("🚪 로그인되지 않은 사용자입니다.");
    }
  }, []);

  // 코드 실행
  const handleRun = (code: string) => {
    if (!terminalRef.current) return;

    terminalRef.current.clear();

    if (language.toLowerCase() === "javascript") {
      try {
        const result = eval(code); // 코드 실행

        terminalRef.current.write(`\r\n[결과] ${String(result)}\r\n`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          terminalRef.current.write(`\r\n[오류] ${error.message}\r\n`);
        } else {
          terminalRef.current.write(`\r\n[오류] 알 수 없는 오류입니다\r\n`);
        }
      }
    } else {
      terminalRef.current.write(`\r\n[아직 지원되지 않는 언어입니다]\r\n`);
    }
  };

  // 프로젝트 단 건 조회 (비로그인 사용자도 가능)
  useEffect(() => {
    const token = getAuthCookie().token ?? undefined;

    fetchProject(projectId, token)
      .then((data) => {
        console.log("📦 fetchProject 응답:", data);
        setProjects([
          {
            id: data.sharedUUID,
            name: data.projectName,
            projectId: data.id,
          },
        ]);
        setProjectId(data.id); // 여기서 projectId 전역 저장
        setFiles(
          data.files.map((file: FileItem) => ({
            id: String(file.id),
            name: file.name,
            content: "", // 서버에서 코드 본문은 아직 안 넘겨줌
            projectId: data.sharedUUID, // UUID
            language: file.language ?? "javascript", // 없으면 기본값
            updatedAt: file.updatedAt ?? new Date().toISOString(),
            ownerId: Number(file.ownerId) ?? 0,
            locked: file.locked ?? false,
            editLocked: file.editLocked ?? false,
          }))
        );
      })
      .catch((err) => {
        console.error("❌ 프로젝트 불러오기 실패:", err);
      });
  }, [projectId, setProjects, setFiles, setProjectId]);

  return (
    <div>
      <div className="flex">
        <Sidebar />
        {/* 전달 */}
        <div className="flex flex-1 flex-col min-w-0">
          <Header onRun={handleRun} />
          <div className="flex min-w-0">
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
