"use client";

import { useCodeStore } from "@/stores/useCodeStore";

type RunButtonProps = {
  onRun: (code: string) => void;
};

const RunButton = ({ onRun }: RunButtonProps) => {
  const code = useCodeStore((state) => state.code);
  const handleClick = () => {
    onRun(code);
  };
  return (
    <button
      onClick={handleClick}
      className="w-[100px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow-md transition duration-150"
    >
      실행 ▶
    </button>
  );
};

export default RunButton;
