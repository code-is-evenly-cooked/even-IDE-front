"use client";

import { useState } from "react";
import FileExplorer from "@/components/editor/FileExplorer";
import { useIdeStore } from "@/stores/useIdeStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { createProject } from "@/service/project"; // API 요청 함수
import { useAuthStore } from "@/stores/useAuthStore";
import {
  EvenIcon,
  FileNewIcon,
  FolderNewIcon,
  BackIcon,
  CloseIcon,
} from "../../common/Icons";

export default function Sidebar() {
  const { addFile, deleteFile, setEditingFileId, currentFileId } = useIdeStore();
    const { addProject } = useProjectStore(); 

    const [isAddingProject, setIsAddingProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");

  // 파일 추가
  const handleAddFile = () => {
    const id = Date.now().toString();
    addFile("", id);
    setEditingFileId(id);
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

    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.error("로그인 토큰이 없습니다.");
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const project = await createProject(trimmed, token);
      addProject(project); // zustand에 저장
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
        <FileExplorer />
      </div>
    </aside>
  );
}
