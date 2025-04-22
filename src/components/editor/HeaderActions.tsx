import { Download, Upload, Share2, Github, Save } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { QnaIcon } from "@/components/common/Icons";
import { useIdeStore } from "@/stores/useIdeStore";
import ShareQR from "./ShareQR";
import { useState } from "react";

export default function HeaderActions() {
  const [isShareOpen, setIsShareOpen] = useState(false);
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

		// 내보내기 여부 확인
		const confirmExport = window.confirm(
			`"${currentFile.name}" 파일을 내보내시겠습니까?`
		);
		if (!confirmExport) return; // 취소 시 동작 중단

		const mimeType = getMimeType(currentFile.name);
		const blob = new Blob([currentFile.content], { type: mimeType }); // 파일 내용과 타입
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = currentFile.name || "untitled.txt"; // 파일 이름
		a.click();
		URL.revokeObjectURL(url);
	};

  const projectUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleSave = () => {
    const { files } = useIdeStore.getState();
  
    if (files.length === 0) {
      alert("저장할 파일이 없습니다.");
      return;
    }
  
    console.log("💾 저장할 파일 목록:", files);
  };

  return (
    <div className="flex gap-1 px-3">
      <IconButton
        icon={<Save className="w-5 h-5" />}
        label="저장"
        onClick={handleSave}
        color="gray500"
        size="md"
        className="hover:bg-slate-400"
        transparent
      />
      <IconButton
        icon={<Download className="w-5 h-5" />}
        label="내보내기"
        onClick={handleExport}
        color="gray500"
        size="md"
        className="hover:bg-slate-400"
        transparent
      />
      <IconButton
        icon={<Upload className="w-5 h-5" />}
        label="가져오기"
        onClick={() => alert("가져오기 버튼")}
        color="gray500"
        size="md"
        transparent
      />
      <IconButton
        icon={<Share2 className="w-5 h-5" />}
        label="공유"
        onClick={() => setIsShareOpen(true)}
        color="gray500"
        size="md"
        transparent
      />
      {/* 공유 모달 */}
      <ShareQR
        url={projectUrl}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
      <IconButton
        icon={<Github className="w-6 h-6" />}
        label="Info"
        onClick={() => alert("Github 버튼")}
        color="gray500"
        size="md"
        transparent
      />
      <IconButton
        icon={<QnaIcon className="w-6 h-6" />}
        label="Info"
        onClick={() => alert("Info 버튼")}
        color="gray500"
        size="md"
        transparent
      />
    </div>
  );
}
