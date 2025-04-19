"use client";

import { useChatStore } from "@/stores/useChatStore";
import ChatTitle from "./ChatTitle";

const ChatModal = () => {
	const { isVisible, viewMode } = useChatStore();

	if (!isVisible || viewMode !== "modal") return null;

	return (
		<div className="fixed right-11 top-11 w-[320px] h-[480px] shadow-lg border-none bg-gray500 z-50 flex flex-col">
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
		</div>
	);
};

export default ChatModal;
