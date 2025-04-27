import IconButton from "@/components/common/Button/IconButton";
import { Ellipsis } from "lucide-react";
import {
  ChatTransferIcon,
  CloseIcon,
  MinusCloseIcon,
} from "@/components/common/Icons";
import { useChatStore } from "@/stores/useChatStore";
import { usePanelStore } from "@/stores/usePanelState";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import React from "react";

const ChatTitle = () => {
  const { viewMode, setViewMode } = useChatStore();
  const { closePanel } = usePanelStore();
  const { open } = useLoginModalStore();

  return (
    <div className="p-4 text-md font-semibold text-white text-center flex justify-between items-center">
      {viewMode === "panel" && <span>채팅</span>}
      <div className="ml-auto">
        <IconButton
          icon={<Ellipsis className="w-8 h-8" />}
          size="sm"
          label="로그인 모달"
          transparent
          onClick={open}
        />
        <IconButton
          icon={<ChatTransferIcon />}
          size="sm"
          label={viewMode === "modal" ? "패널로 보기" : "모달로 보기"}
          transparent
          onClick={() => setViewMode(viewMode === "modal" ? "panel" : "modal")}
        />
        <IconButton
          icon={viewMode === "modal" ? <CloseIcon /> : <MinusCloseIcon />}
          size="sm"
          label="닫기"
          transparent
          onClick={closePanel}
        />
      </div>
    </div>
  );
};

export default ChatTitle;
