import { useChatStore } from "@/stores/useChatStore";
import { chatDateConverter } from "@/utils/chat";
import React, { useEffect, useRef } from "react";

const ChatMessageList = () => {
	const { messages } = useChatStore();
	const messageWithDates = chatDateConverter(messages);
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<div className="flex flex-col">
			{messageWithDates.map((message, index) =>
				message.type === "DATE" ? (
					<div
						key={`date-${index}`}
						className="flex items-center py-2 gap-4 text-sm text-white"
					>
						<hr className="flex-1 border-t bg-white" />
						{message.content}
						<hr className="flex-1 border-t bg-white" />
					</div>
				) : (
					<div
						key={index}
						className="flex flex-col p-2 gap-y-0.5 text-sm text-white hover:bg-transparent/10"
					>
						{message.type === "MESSAGE" && (
							<span className="font-semibold">{message.nickname}</span>
						)}
						<span>{message.content}</span>
						<div ref={bottomRef} />
					</div>
				)
			)}
		</div>
	);
};

export default ChatMessageList;
