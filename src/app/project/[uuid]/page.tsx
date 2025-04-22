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


const CodeEditor = dynamic(() => import("@/components/editor/CodeEditor"), {
  ssr: false,
});
const TerminalView = dynamic(() => import("@/components/editor/Terminal"), {
  ssr: false,
});

export default function ProjectPage({ params }: { params: { uuid: string } }) {
  const projectId = params.uuid;
  const terminalRef = useRef<XtermType | null>(null);
  //const [activePanel, setActivePanel] = useState<PanelType | null>(null);
  const language = useLanguageStore((state) => state.language);
  const { setProjects } = useProjectStore();
  const { setFiles } = useIdeStore();

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
      // 지원되지 않는 언어에 대한 메시지
      terminalRef.current.write(`\r\n[아직 지원되지 않는 언어입니다]\r\n`);
    }
  };

  useEffect(() => {
    const token = getAuthCookie().token;
    if (!token) return;

    fetchProject(projectId, token)
      .then((data) => {
        setProjects([{ id: data.sharedUUID, name: data.projectName }]);

        setFiles(
          (data.files as FileItem[]).map((file) => ({
            id: String(file.id),
            name: file.name,
            content: "",
            projectId: data.sharedUUID,
          }))
        );
      })
      .catch((err) => {
        console.error("❌ 프로젝트 불러오기 실패:", err);
      });
  }, [projectId, setProjects, setFiles]);

  return (
    <div>
      <div className="flex">
        <Sidebar projectId={projectId} /> {/* 전달 */}
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
