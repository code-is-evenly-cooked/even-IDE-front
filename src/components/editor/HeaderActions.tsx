import { Download, Upload } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";

export default function HeaderActions() {
  // 내보내기 기능
  const handleExport = () => {
    const blob = new Blob(["코드 내용"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-code.txt";
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
