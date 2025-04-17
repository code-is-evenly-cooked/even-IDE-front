"use client";
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type ShareQRProps = {
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ShareQR({ url, isOpen, onClose }: ShareQRProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && qrRef.current) {
      qrRef.current.innerHTML = ""; // 중복 append 방지
      const qr = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        dotsOptions: { color: "#333", type: "rounded" },
        backgroundOptions: { color: "#fff" },
      });
      qr.append(qrRef.current);
    }
  }, [isOpen, url]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-[300px]">
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>
          ×
        </button>
        <h3 className="text-black text-lg font-semibold mb-4">프로젝트 공유</h3>
        <input
          value={url}
          readOnly
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleCopy}
          className="text-blue-600 underline mb-4 text-sm"
        >
          링크 복사
        </button>
        <div ref={qrRef} />
      </div>
    </div>
  );
}
