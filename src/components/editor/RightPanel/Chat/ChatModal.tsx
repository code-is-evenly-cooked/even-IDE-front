"use client";

import { useChatStore } from "@/stores/useChatStore";
import ChatTitle from "./ChatTitle";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

const ChatModal = () => {
	const { isVisible, viewMode } = useChatStore();

	if (!isVisible || viewMode !== "modal") return null;

	return (
		<div className="fixed right-11 top-11 w-[320px] h-[480px] shadow-lg border-none bg-gray700 z-50 flex flex-col">
			<ChatTitle />
			<div className="flex-1 overflow-y-auto px-4 py-2">
				<ChatMessageList />
			</div>
			<ChatInput />
		</div>
	);
};

export default ChatModal;
