"use client";

import { useChatStore } from "@/stores/useChatStore";
import ChatTitle from "./ChatTitle";

const ChatPanel = () => {
	const { isVisible, viewMode } = useChatStore();

	if (!isVisible || viewMode !== "panel") return null;

	return (
		<aside className="w-[320px] h-full bg-gray800 border-none flex flex-col">
			<ChatTitle />
			<div className="flex-1 overflow-y-auto px-4 py-2">
				{/* 채팅 메시지들 */}
			</div>
			<div className="p-4 border-t border-gray-700">
				<input
					type="text"
					className="w-full rounded-lg border-none bg-gray-800 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
					placeholder="메시지를 입력하세요"
				/>
			</div>
		</aside>
	);
};

export default ChatPanel;
