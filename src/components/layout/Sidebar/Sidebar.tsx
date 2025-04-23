"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileExplorer from "@/components/editor/FileExplorer";
import { useIdeStore } from "@/stores/useIdeStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { createProject } from "@/service/project";
import { createFile } from "@/service/file";
import { getAuthCookie } from "@/lib/cookie";
import { deleteProject } from "@/service/project";
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
  const { addFile, deleteFile, currentFileId, setEditingFileId, files } =
    useIdeStore();
  const { addProject, removeProject, projects } = useProjectStore();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const router = useRouter();

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
      const newFile = await createFile(project.projectId, "파일", token);
      const newFileId = String(newFile.fileId);
      addFile(newFile.filename, selectedProjectId, newFileId);

      // 파일 생성 후 이름 입력 모드 진입
      setEditingFileId(newFileId);
    } catch (err) {
      alert("파일 생성 실패");
      console.error(err);
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

  // 선택한 프로젝트 이동
  const handleGoToProject = () => {
    let targetProjectUUID: string | null = null;

    if (selectedProjectId) {
    // 선택된 프로젝트가 있는 경우 → 바로 UUID 사용
    targetProjectUUID = selectedProjectId;
  } else if (currentFileId) {
    // 파일이 선택된 경우 → 해당 파일의 projectId를 추적
    const file = files.find((f) => f.id === currentFileId);
    if (file) {
      const project = projects.find((p) => p.projectId === Number(file.projectId));
      if (project) {
        targetProjectUUID = project.id; // UUID
      }
    }
  }

  if (!targetProjectUUID) {
    alert("이동할 프로젝트를 찾을 수 없습니다.");
    return;
  }

  router.push(`/project/${targetProjectUUID}`);
};

  // 삭제 기능 통합 (파일 + 프로젝트)
  const handleDelete = async () => {
    const token = getAuthCookie().token;

    // 프로젝트 삭제
    if (selectedProjectId && !currentFileId) {
      const confirmProjectDelete =
        window.confirm("이 프로젝트를 삭제하시겠습니까?");
      if (!confirmProjectDelete) return;

      const project = projects.find((p) => p.id === selectedProjectId);
      if (!project) {
        alert("프로젝트 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        await deleteProject(project.projectId, token);  //  서버에서 제거
        removeProject(selectedProjectId);  //  상태 제거
        setSelectedProjectId(null);  //  선택 해제
      } catch (err) {
        console.error("❌ 프로젝트 삭제 실패:", err);
        alert("프로젝트 삭제 중 오류가 발생했습니다.");
      }

      return;
    }

    if (currentFileId) {
      const confirmFileDelete = window.confirm(
        "정말로 이 파일을 삭제하시겠습니까?"
      );
      if (!confirmFileDelete) return;
      deleteFile(currentFileId);
      return;
    }

    alert("삭제할 항목을 선택해주세요.");
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
        <button title="프로젝트 이동" onClick={handleGoToProject}>
          <BackIcon className="w-4 h-4" />
        </button>
        <button title="삭제" onClick={handleDelete}>
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
          onProjectClick={
            projectId ? () => {} : (id) => setSelectedProjectId(id)
          }
          selectedProjectId={selectedProjectId ?? ""} // null 방지 처리
        />
      </div>
    </aside>
  );
}
