import FileExplorer from "@/components/editor/FileExplorer";
import { Plus, Undo2, Trash2, FolderPlus } from "lucide-react";
import { useIdeStore } from "@/stores/useIdeStore";
import { EvenIcon } from "../../common/Icons";


export default function Sidebar() {
  const { addFile, selectFile, files } = useIdeStore();

  const handleAddFile = () => {
    const name = `newFile${files.length + 1}.js`;
    addFile(name);

    // 추가한 파일을 바로 선택
    const lastFile = files[files.length - 1];
    if (lastFile) selectFile(lastFile.id);
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
      <div className="flex gap-2 px-4 py-3 border-b border-gray-700">
        <button className="ml-auto" title="파일 추가" onClick={handleAddFile}>
          <Plus className="w-4 h-4 hover:text-blue-400" />
        </button>
        <button title="프로젝트 추가">
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
