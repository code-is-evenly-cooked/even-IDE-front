"use client";

import { useChatStore } from "@/stores/useChatStore";
import ChatTitle from "./ChatTitle";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

const ChatPanel = () => {
	const { isVisible, viewMode } = useChatStore();

	if (!isVisible || viewMode !== "panel") return null;

	return (
		<aside className="w-[320px] h-full bg-gray800 border-none flex flex-col">
			<ChatTitle />
			<div className="flex-1 overflow-y-auto p-1 scrollbar-thumb">
				<ChatMessageList />
			</div>
			<ChatInput />
		</aside>
	);
};

export default ChatPanel;
