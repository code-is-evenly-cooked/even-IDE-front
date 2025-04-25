"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileExplorer from "@/components/editor/FileExplorer";
import { useIdeStore } from "@/stores/useIdeStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { createProject } from "@/service/project";
import { createFile, deleteFileById, updateFileName } from "@/service/file";
import { getAuthCookie } from "@/lib/cookie";
import { deleteProject } from "@/service/project";
import { usePathname } from "next/navigation";
import {
  EvenIcon,
  FileNewIcon,
  FolderNewIcon,
  BackIcon,
  CloseIcon,
} from "../../common/Icons";

export default function Sidebar() {
  const {
    addFile,
    deleteFile,
    currentFileId,
    setCurrentFileId,
    setEditingFileId,
    files,
    setFiles,
  } = useIdeStore();
  const { addProject, removeProject, projects, setProjectId } =
    useProjectStore();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const router = useRouter();
  const ownerId = Number(getAuthCookie().userId);
  const token = getAuthCookie().token;
  const pathname = usePathname();
  const isInProjectPage = pathname.startsWith("/project/");

  // 파일 추가 (임시 생성 → 이름 입력 후 서버로 생성)
  const handleAddFile = async () => {

    // 프로젝트 페이지 프로젝트 선택 없이 파일 추가 가능
    if (isInProjectPage) {
      const project = projects[0]; // 상태에 저장된 하나의 프로젝트
      if (!project || !token) return;

      const tempId = `temp-${Date.now()}`;
      addFile("파일", project.id, ownerId, tempId);
      setEditingFileId(tempId);
      return;
    }

    // 에디터 페이지는 프로젝트 선택 필수
    if (!selectedProjectId) {
      alert("먼저 프로젝트를 선택해주세요.");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    addFile("파일", selectedProjectId, ownerId, tempId);
    setEditingFileId(tempId);
  };

  // 파일 이름 입력 완료 시 서버 반영 (이름 수정도 분기 처리)
  const handleFileNameSubmit = async (fileId: string, newName: string) => {
    const file = files.find((f) => f.id === fileId);
    const project = projects.find((p) => p.id === file?.projectId);

    if (!project || !file || !token) return;

    const isTempFile = fileId.startsWith("temp-");

    try {
      if (isTempFile) {
        // 임시 파일이면 파일 생성
        const result = await createFile(project.projectId, newName, token);
        const serverId = String(result.fileId);

        const updatedFiles = files.map((f) =>
          f.id === fileId ? { ...f, id: serverId, name: newName } : f
        );

        setFiles(updatedFiles);
      } else {
        // 기존 파일이면 이름만 변경
        await updateFileName(project.projectId, fileId, newName, token);

        const updatedFiles = files.map((f) =>
          f.id === fileId ? { ...f, name: newName } : f
        );

        setFiles(updatedFiles);
        setEditingFileId(null);
      }
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
    if (currentFileId) {
      const confirmDelete = confirm("이 파일을 삭제하시겠습니까?");
      if (!confirmDelete) return;

      const file = files.find((f) => f.id === currentFileId);
      const numericProjectId = projects.find(
        (p) => p.id === file?.projectId
      )?.projectId;

      console.log("🟡 currentFileId:", currentFileId);
      console.log("🟢 file:", file);
      console.log("🧩 file.projectId:", file?.projectId);
      console.log("📂 all projects:", projects);

      if (!file || numericProjectId === undefined || !token) {
        alert("파일 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        await deleteFileById(numericProjectId, file.id, token); // API 호출
        deleteFile(file.id); // Zustand 상태 삭제
      } catch (err) {
        console.error("파일 삭제 실패:", err);
        alert("파일 삭제 중 오류가 발생했습니다.");
      }

      return;
    }

    if (selectedProjectId && !currentFileId) {
      // 프로젝트 삭제 처리
      const confirmDelete = confirm("이 프로젝트를 삭제하시겠습니까?");
      if (!confirmDelete) return;

      const project = projects.find((p) => p.id === selectedProjectId);
      if (!project || !token) {
        alert("프로젝트 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        await deleteProject(project.projectId, token); // 서버에서 삭제
        removeProject(selectedProjectId); // 상태에서도 삭제
        setSelectedProjectId(null); // 선택 해제
      } catch (err) {
        console.error("프로젝트 삭제 실패:", err);
        alert("프로젝트 삭제 중 오류가 발생했습니다.");
      }

      return;
    }

    alert("삭제할 항목을 선택해주세요.");
  };

  return (
    <aside className="w-[280px] min-w-[280px] h-screen border-tonedown border-[1px] bg-gray700 text-white flex flex-col">
      <div
        className="flex px-5 py-3 content-center text-lg font-bold border-b border-gray-700 bg-tonedown cursor-pointer"
        onClick={() => router.push("/editor")}
      >
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
          onProjectClick={(id) => {
            setSelectedProjectId(id); // 프로젝트 선택
            setCurrentFileId(null); // 파일 선택 해제

            const project = projects.find((p) => p.id === id);
            if (project) {
              setProjectId(project.projectId);
            }
          }}
          selectedProjectId={selectedProjectId ?? ""}
          onFileNameSubmit={handleFileNameSubmit}
          onFileClick={() => setSelectedProjectId(null)}
          onClearProjectSelection={() => setSelectedProjectId(null)}
        />
      </div>
    </aside>
  );
}
