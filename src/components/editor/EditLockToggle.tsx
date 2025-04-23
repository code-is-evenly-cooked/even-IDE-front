"use client";

import { GhostIcon } from "../common/Icons";

type EditLockToggleProps = {
  editLocked: boolean;
  onToggle: () => void;
  isOwner: boolean;
  showMessage: (msg: string) => void;
};

export default function EditLockToggle({
  editLocked,
  onToggle,
  isOwner,
  showMessage,
}: EditLockToggleProps) {
  const handleClick = () => {
    if (!isOwner) {
      showMessage("코드 파일 주인만 잠금 기능을 사용할 수 있습니다.");
      return;
    }
    onToggle();
  };

  const bgColor = editLocked ? "bg-[#3E3655]" : "bg-[#262626]";
  const circleColor = editLocked ? "bg-[#262626]" : "bg-[#1E1E1E]";
  const ghostColor = editLocked ? "text-[#3E3655]" : "text-[#1E1E1E]";

  return (
    <div className="flex items-center gap-2">
      <GhostIcon className={`w-6 h-6 ${ghostColor}`} />

      <button
        onClick={handleClick}
        className={`w-[60px] h-[30px] rounded-full p-1 flex items-center transition-colors duration-300 ${bgColor}`}
      >
        <div
          className={`w-[24px] h-[24px] rounded-full transition-transform duration-300 ${circleColor} ${
            editLocked ? "translate-x-0" : "translate-x-[28px]"
          }`}
        />
      </button>
    </div>
  );
}
