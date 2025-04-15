import { useIdeStore } from "@/stores/useIdeStore";
import { clsx } from "clsx";
import { useState } from "react";

export default function FileExplorer() {
  const { files, currentFileId, openFile, addFile } = useIdeStore();
  const [fileCount, setFileCount] = useState(1);

  const handleAddFile = () => {
    const name = `newFile${fileCount}.js`; // 파일 이름 자동 증가
    addFile(name);
    setFileCount((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-400 font-semibold">📁 프로젝트</div>
        <button
          onClick={handleAddFile}
          className="text-sm text-blue-500 hover:underline"
        >
          + 새 파일
        </button>
      </div>

      <ul className="pl-2 space-y-1">
        {files.map((file) => (
          <li
            key={file.id}
            onClick={() => openFile(file.id)}
            className={clsx(
              "cursor-pointer px-2 py-1 rounded text-sm transition-colors",
              currentFileId === file.id
                ? "bg-zinc-300 text-black font-bold"
                : "text-gray-600 hover:bg-zinc-100"
            )}
          >
            📄 {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
