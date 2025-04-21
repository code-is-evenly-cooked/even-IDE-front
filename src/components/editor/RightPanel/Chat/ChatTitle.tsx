import IconButton from "@/components/common/Button/IconButton";
import { ChatTransferIcon, CloseIcon } from "@/components/common/Icons";
import { useChatStore } from "@/stores/useChatStore";
import React from "react";

const ChatTitle = () => {
	const { viewMode, toggleVisibility, setViewMode } = useChatStore();

	return (
		<div className="p-4 text-md font-semibold text-white text-center flex justify-between items-center">
			{viewMode === "panel" && <span>채팅</span>}
			<div className="ml-auto">
				<IconButton
					icon={<ChatTransferIcon />}
					size="sm"
					label={viewMode === "modal" ? "패널로 보기" : "모달로 보기"}
					transparent
					onClick={() => setViewMode(viewMode === "modal" ? "panel" : "modal")}
				/>
				<IconButton
					icon={<CloseIcon />}
					size="sm"
					label={viewMode === "modal" ? "패널로 보기" : "모달로 보기"}
					transparent
					onClick={toggleVisibility}
				/>
			</div>
		</div>
	);
};

export default ChatTitle;
