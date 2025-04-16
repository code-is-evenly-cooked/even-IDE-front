import { Download, Upload } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { useIdeStore } from "@/stores/useIdeStore";

export default function HeaderActions() {
  
  // 확장자 별 MIME 타입 (내보내기에서 사용)
  const getMimeType = (filename: string): string => {
    if (filename.endsWith(".html")) return "text/html";
    if (filename.endsWith(".js")) return "application/javascript";
    if (filename.endsWith(".ts")) return "application/typescript";
    if (filename.endsWith(".java")) return "text/x-java-source"; // 또는 text/plain
    if (filename.endsWith(".py")) return "text/x-python"; // 또는 text/plain
    if (filename.endsWith(".json")) return "application/json";
    if (filename.endsWith(".css")) return "text/css";
    return "text/plain"; // 기본값
  };

  // 내보내기 기능
  const handleExport = () => {
    const { files, currentFileId } = useIdeStore.getState(); // 열려있는 파일 상태 조회

    // 파일이 선택 중인지 확인
    const currentFile = files.find((f) => f.id === currentFileId);
    if (!currentFile) {
      alert("내보낼 파일이 선택되지 않았습니다.");
      return;
    }

    const mimeType = getMimeType(currentFile.name);
    const blob = new Blob([currentFile.content], { type: mimeType }); // 파일 내용과 타입
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = currentFile.name || "untitled.txt"; // 파일 이름
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-1 px-3">
      <IconButton
        icon={<Download className="w-5 h-5" />}
        label="내보내기"
        onClick={handleExport}
        color="gray500"
        textColor="white"
        size="md"
        className="hover:bg-slate-400"
        transparent
      />
      <IconButton
        icon={<Upload className="w-5 h-5" />}
        label="가져오기"
        onClick={() => alert("가져오기 버튼")}
        color="gray500"
        textColor="white"
        size="md"
        transparent
      />
    </div>
  );
}
