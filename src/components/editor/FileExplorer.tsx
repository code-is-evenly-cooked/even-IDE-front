import { useIdeStore } from "@/stores/useIdeStore";
import { clsx } from "clsx";

export default function FileExplorer() {
  const { files, currentFileId, selectFile } = useIdeStore();

  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="text-sm text-gray-400 font-semibold mb-1">📁 프로젝트</div>

      <ul className="pl-2 space-y-1">
        {files.map((file) => (
          <li
            key={file.id}
            onClick={() => selectFile(file.id)}
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