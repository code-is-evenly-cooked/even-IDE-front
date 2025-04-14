import FileExplorer from "@/components/editor/FileExplorer";
import { useIdeStore } from "@/stores/useIdeStore";
import { EvenIcon, FileNewIcon, FolderNewIcon, BackIcon, CloseIcon } from "../../common/Icons";


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
      <div className="flex gap-3 px-3 py-3 border-b border-gray-700">
        <button className="ml-auto" title="파일 추가" onClick={handleAddFile}>
          <FileNewIcon className="w-4 h-4" />
        </button>
        <button title="프로젝트 추가">
          <FolderNewIcon className="w-4 h-4" />
        </button>
        <button title="되돌리기">
          <BackIcon className="w-4 h-4" />
        </button>
        <button title="삭제">
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 파일 탐색기 */}
      <div className="flex-1 overflow-y-auto">
        <FileExplorer />
      </div>
    </aside>
  );
}
