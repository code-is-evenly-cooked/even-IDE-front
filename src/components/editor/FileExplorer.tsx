import { useIdeStore } from "@/stores/useIdeStore";
import { clsx } from "clsx";
import { FolderIcon, FileIcon} from "@/components/common/Icons";

export default function FileExplorer() {
  const { files, currentFileId, openFile } = useIdeStore();


  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center mb-2 px-3 pt-3">
        <div className="flex text-sm text-white font-medium">
          <FolderIcon className="w-5 h-5" />
          <span className="ml-3">프로젝트</span>
        </div>
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
