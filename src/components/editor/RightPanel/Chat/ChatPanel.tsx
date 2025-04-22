"use client";

import { useChatStore } from "@/stores/useChatStore";
import ChatTitle from "./ChatTitle";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

const ChatPanel = () => {
	const { isVisible, viewMode } = useChatStore();

	if (!isVisible || viewMode !== "panel") return null;

	return (
		<aside className="w-[320px] bg-gray800 border-none flex flex-col min-w-0">
			<ChatTitle />
			<div className="flex-1 overflow-y-auto px-4 py-2">
				<ChatMessageList />
			</div>
			<ChatInput />
		</aside>
	);
};

export default ChatPanel;
