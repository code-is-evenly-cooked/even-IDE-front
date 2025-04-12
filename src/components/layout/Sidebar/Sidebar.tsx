import FileExplorer from "@/components/editor/FileExplorer";
import { Plus, Undo2, Trash2, FolderPlus } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-gray700 text-white flex flex-col">
      {/* 상단 로고 */}
      <div className="px-4 py-3 text-lg font-bold border-b border-gray-700">
        even ide 로고
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 px-4 py-3 border-b border-gray-700">
        <button className="ml-auto" title="프로젝트 추가">
          <Plus className="w-4 h-4 hover:text-blue-400" />
        </button>
        <button title="파일 추가">
          <FolderPlus className="w-4 h-4 hover:text-green-400" />
        </button>
        <button title="되돌리기">
          <Undo2 className="w-4 h-4 hover:text-yellow-400" />
        </button>
        <button title="삭제">
          <Trash2 className="w-4 h-4 hover:text-red-400" />
        </button>
      </div>

      {/* 파일 탐색기 */}
      <div className="flex-1 overflow-y-auto">
        <FileExplorer />
      </div>
    </aside>
  );
}
