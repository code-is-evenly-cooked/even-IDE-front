import { useIdeStore } from "@/stores/useIdeStore";
import { clsx } from "clsx";
import { useState } from "react";
import { FolderIcon, FileIcon} from "@/components/common/Icons";

export default function FileExplorer() {
  const { files, currentFileId, openFile, addFile } = useIdeStore();
  const [fileCount, setFileCount] = useState(1);

  const handleAddFile = () => {
    const name = `newFile${fileCount}.js`; // 파일 이름 자동 증가
    addFile(name);
    setFileCount((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center mb-2 px-3 pt-3">
        <div className="flex text-sm text-white font-medium">
          <FolderIcon className="w-5 h-5" />
          <span className="ml-3">프로젝트</span>
        </div>
        <button
          onClick={handleAddFile}
          className="text-sm text-blue-500 hover:underline"
        >
          + 새 파일
        </button>
      </div>

      <ul className="space-y-1">
        {files.map((file) => (
          <li
            key={file.id}
            onClick={() => openFile(file.id)}
            className={clsx(
              "flex cursor-pointer px-8 py-2 text-sm transition-colors",
              currentFileId === file.id
                ? "bg-gray500 text-white font-bold"
                : "text-white hover:bg-gray700"
            )}
          >
            <FileIcon className="w-5 h-5" />
            <span className="ml-2">{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
