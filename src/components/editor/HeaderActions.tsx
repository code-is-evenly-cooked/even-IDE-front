import { Download, Upload } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { useIdeStore } from "@/stores/useIdeStore";

export default function HeaderActions() {
  // 내보내기 기능
  const handleExport = () => {
    const { files, currentFileId } = useIdeStore.getState();  // 열려있는 파일 상태 조회

    // 파일이 선택 중인지 확인
    const currentFile = files.find((f) => f.id === currentFileId);
    if (!currentFile) {
      alert("내보낼 파일이 선택되지 않았습니다.");
      return;
    }

    const blob = new Blob([currentFile.content], { type: "text/plain" });  // 파일 내용과 타입
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = currentFile.name || "untitled.txt";  // 파일 이름
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
