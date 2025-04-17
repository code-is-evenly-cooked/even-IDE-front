"use client";
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Copy } from "lucide-react";

type ShareQRProps = {
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ShareQR({ url, isOpen, onClose }: ShareQRProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (isOpen && qrRef.current) {
      qrRef.current.innerHTML = ""; // 중복 append 방지
      const qr = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        dotsOptions: { color: "#000", type: "rounded" },
        backgroundOptions: { color: "#fff" },
      });
      qr.append(qrRef.current);
      qrCodeInstance.current = qr;
    }
  }, [isOpen, url]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다!");
  };

  const handleDownload = () => {
    qrCodeInstance.current?.download({
      name: "project-qrcode",
      extension: "png",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg relative w-[300px]">
        <button className="absolute text-black top-2 right-3 text-3xl" onClick={onClose}>
          ×
        </button>
        <h3 className="text-black text-lg font-semibold mt-[10px] mb-4">프로젝트 공유</h3>
        <div className="flex items-center gap-2">
        <input
          value={url}
          readOnly
          className="flex-1 text-black p-2 border rounded mb-4"
        />
        <button
          onClick={handleCopy}
          className="text-blue-600 underline mb-4 text-sm"
        >
          <Copy className="w-5 h-5 text-gray500"/>
        </button>
        </div>
        <div ref={qrRef} className="flex justify-center" />
        <button className="w-full h-[40px] mt-4 text-white bg-gray500 font-semibold p-1 rounded" onClick={handleDownload}>QR 코드 다운로드</button>
      </div>
    </div>
  );
}
