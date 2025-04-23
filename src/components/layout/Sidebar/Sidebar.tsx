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
  const {
    addFile,
    deleteFile,
    currentFileId,
    setEditingFileId,
    files,
    setFiles,
  } = useIdeStore();
  const { addProject, removeProject, projects } = useProjectStore();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const ownerId = Number(getAuthCookie().userId);
  const token = getAuthCookie().token;

  // 파일 추가 (임시 생성 → 이름 입력 후 서버로 생성)
  const handleAddFile = async () => {
    if (!selectedProjectId) {
      alert("먼저 프로젝트를 선택해주세요.");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    addFile("파일", selectedProjectId, ownerId, tempId);
    setEditingFileId(tempId);
  };

  // 파일 이름 입력 완료 시 서버 반영
  const handleFileNameSubmit = async (fileId: string, newName: string) => {
    const file = files.find((f) => f.id === fileId);
    const project = projects.find((p) => p.id === file?.projectId);
    if (!project || !file || !token) return;

    try {
      const result = await createFile(project.projectId, newName, token);
      const serverId = String(result.fileId);

      const updatedFiles = files.map((f) =>
        f.id === fileId ? { ...f, id: serverId, name: newName } : f
      );

      setFiles(updatedFiles);
    } catch (err) {
      alert("파일 생성 실패");
      console.error(err);
    }
  };

  const handleAddProject = () => {
    setIsAddingProject(true);
    setNewProjectName("");
  };

  const handleProjectSubmit = async () => {
    const trimmed = newProjectName.trim();
    if (!trimmed) {
      setIsAddingProject(false);
      return;
    }

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const project = await createProject(trimmed, token, ownerId);
      addProject({
        id: project.id,
        name: project.name,
        projectId: project.projectId,
      });
    } catch (err) {
      console.error("프로젝트 생성 실패", err);
    }

    setIsAddingProject(false);
  };

  const handleGoToProject = () => {
    let targetUUID: string | null = null;

    if (selectedProjectId) {
      targetUUID = selectedProjectId;
    } else if (currentFileId) {
      const file = files.find((f) => f.id === currentFileId);
      const project = projects.find(
        (p) => p.projectId === Number(file?.projectId)
      );
      if (project) targetUUID = project.id;
    }

    if (!targetUUID) {
      alert("이동할 프로젝트를 찾을 수 없습니다.");
      return;
    }

    router.push(`/project/${targetUUID}`);
  };

  const handleDelete = async () => {
    if (selectedProjectId && !currentFileId) {
      const confirmDelete = confirm("이 프로젝트를 삭제하시겠습니까?");
      if (!confirmDelete) return;

      const project = projects.find((p) => p.id === selectedProjectId);
      if (!project || !token) return;

      try {
        await deleteProject(project.projectId, token);
        removeProject(selectedProjectId);
        setSelectedProjectId(null);
      } catch (err) {
        console.error("❌ 프로젝트 삭제 실패:", err);
      }
      return;
    }

    if (currentFileId) {
      const confirmDelete = confirm("이 파일을 삭제하시겠습니까?");
      if (!confirmDelete) return;
      deleteFile(currentFileId);
      return;
    }

    alert("삭제할 항목을 선택해주세요.");
  };

  return (
    <aside className="w-[280px] min-w-[280px] h-screen border-tonedown border-[1px] bg-gray700 text-white flex flex-col">
      <div className="flex px-5 py-3 content-center text-lg font-bold border-b border-gray-700 bg-tonedown">
        <EvenIcon />
        <h1 className="text-3xl font-light ml-3">even ide</h1>
      </div>

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

      <div className="flex-1 overflow-y-auto">
        <FileExplorer
          onProjectClick={
            projectId ? () => {} : (id) => setSelectedProjectId(id)
          }
          selectedProjectId={selectedProjectId ?? ""}
          onFileNameSubmit={handleFileNameSubmit}
        />
      </div>
    </aside>
  );
}
