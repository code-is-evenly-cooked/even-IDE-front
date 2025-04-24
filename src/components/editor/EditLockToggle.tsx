"use client";

import { useState } from "react";
import { GhostIcon } from "../common/Icons";

type EditLockToggleProps = {
  editLocked: boolean;
  onToggle: () => void;
  isOwner: boolean;
};

export default function EditLockToggle({
  editLocked,
  onToggle,
  isOwner,
}: EditLockToggleProps) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    if (!isOwner) {
      setMessage(
        editLocked
          ? "코드 파일 주인만 잠금을 해제 할 수 있습니다."
          : "코드 파일 주인만 잠금 기능을 사용할 수 있습니다."
      );
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(""), 500);
      }, 2000);
      return;
    }
    onToggle();
  };

  return (
    <div className="flex items-center gap-2 relative group">
      {message && (
        <div
          className={`text-xs text-[#F5535E] bg-[#1E1E1E] px-2 py-1 rounded whitespace-nowrap transition-opacity 
				duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {message}
        </div>
      )}

      <GhostIcon
        className={`w-6 h-6 transition-colors duration-500 ${
          editLocked
            ? "text-[#3E3655]"
            : isOwner
            ? "text-[#262626] group-hover:text-white"
            : "text-[#262626]"
        }`}
      />

      <button
        onClick={handleClick}
        className={`w-[60px] h-[30px] rounded-full p-1 flex items-center transition-colors duration-500 ${
          editLocked
            ? "bg-[#3E3655]"
            : isOwner
            ? "bg-[#262626] group-hover:bg-[#A78BFA]"
            : "bg-[#262626]"
        }`}
      >
        <div
          className={`
    w-[24px] h-[24px] rounded-full transition duration-500
    ${
      editLocked
        ? "bg-[#262626] translate-x-0"
        : isOwner
        ? "bg-[#1E1E1E] group-hover:bg-white translate-x-[28px]"
        : "bg-[#1E1E1E] translate-x-[28px]"
    }
  `}
        />
      </button>
    </div>
  );
}
