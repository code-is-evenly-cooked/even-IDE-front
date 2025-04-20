import { useChatStore } from "@/stores/useChatStore";
import React from "react";

const ChatMessageList = () => {
	const { messages } = useChatStore();
	return (
		<div className="flex flex-col gap-4">
			{messages.map((message, index) => (
				<div key={index} className="flex flex-col gap-y-0.5 text-sm text-white">
					{message.type === "MESSAGE" && (
						<span className="font-semibold">{message.nickname}</span>
					)}
					<span>{message.content}</span>
				</div>
			))}
		</div>
	);
};

export default ChatMessageList;
