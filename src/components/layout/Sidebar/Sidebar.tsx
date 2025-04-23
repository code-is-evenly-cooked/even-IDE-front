"use client";

import { useState } from "react";
import FileExplorer from "@/components/editor/FileExplorer";
import { useIdeStore } from "@/stores/useIdeStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { createProject } from "@/service/project";
import { createFile } from "@/service/file";
import { getAuthCookie } from "@/lib/cookie";
import {
  EvenIcon,
  FileNewIcon,
  FolderNewIcon,
  BackIcon,
  CloseIcon,
} from "../../common/Icons";

interface SidebarProps {
  projectId?: string;
}

export default function Sidebar({ projectId }: SidebarProps) {
  const { addFile, deleteFile, currentFileId } = useIdeStore();
  const { addProject, projects } = useProjectStore();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // 파일 추가
  const handleAddFile = async () => {
    
    if (!selectedProjectId) {
      alert("먼저 프로젝트를 선택해주세요.");
      return;
    }

    const token = getAuthCookie().token;
    const project = projects.find((p) => p.id === selectedProjectId);
    console.log("✅ project 응답:", project);
    if (!project) return;

    try {
      const newFile = await createFile(project.projectId, "새 파일", token);
      addFile(newFile.filename, selectedProjectId, String(newFile.fileId));
    } catch (err) {
      alert("파일 생성 실패");
      console.error(err);
    }
  };

  // 파일 삭제
  const handleDeleteFile = () => {
    if (currentFileId) {
      deleteFile(currentFileId);
    }
  };

  // 프로젝트 추가
  const handleAddProject = () => {
    setIsAddingProject(true);
    setNewProjectName("");
  };

  // 프로젝트 이름 입력 완료 시 호출
  const handleProjectSubmit = async () => {
    const trimmed = newProjectName.trim();
    if (!trimmed) {
      setIsAddingProject(false);
      return;
    }

    const token = getAuthCookie().token;
    const ownerId = getAuthCookie().userId;
    if (!token) {
      console.error("로그인 토큰이 없습니다.");
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const project = await createProject(trimmed, token, Number(ownerId));
      addProject({
        id: project.id, // UUID
        name: project.name,
        projectId: project.projectId, // number형 ID
      });
      console.log("✅ project 응답:", project);
    } catch (err) {
      console.error("프로젝트 생성 실패", err);
    }

    setIsAddingProject(false); // 입력창 닫기
  };

  return (
    <aside className="w-[280px] min-w-[280px] h-screen border-tonedown border-[1px] bg-gray700 text-white flex flex-col">
      {/* 상단 로고 */}
      <div className="flex px-5 py-3 content-center text-lg font-bold border-b border-gray-700 bg-tonedown">
        <div>
          <EvenIcon />
        </div>
        <h1 className="text-3xl font-light ml-3">even ide</h1>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 px-3 py-3 border-b border-gray-700">
        <button className="ml-auto" title="파일 추가" onClick={handleAddFile}>
          <FileNewIcon className="w-4 h-4" />
        </button>
        <button title="프로젝트 추가" onClick={handleAddProject}>
          <FolderNewIcon className="w-4 h-4" />
        </button>
        <button title="되돌리기">
          <BackIcon className="w-4 h-4" />
        </button>
        <button title="삭제" onClick={handleDeleteFile}>
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 프로젝트 입력창 */}
      {isAddingProject && (
        <div className="px-4 py-3">
          <input
            autoFocus
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onBlur={handleProjectSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleProjectSubmit();
              if (e.key === "Escape") setIsAddingProject(false);
            }}
            className="w-full px-2 py-1 text-black rounded"
            placeholder="프로젝트 이름 입력"
          />
        </div>
      )}

      {/* 파일 탐색기 */}
      <div className="flex-1 overflow-y-auto">
        <FileExplorer
          onProjectClick={projectId ? () => {} : (id) => setSelectedProjectId(id)}
          selectedProjectId={selectedProjectId ?? ""} // null 방지 처리
        />
      </div>
    </aside>
  );
}
