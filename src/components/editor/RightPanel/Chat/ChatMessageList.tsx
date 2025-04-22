import { useChatStore } from "@/stores/useChatStore";
import React, { useEffect, useRef } from "react";

const ChatMessageList = () => {
	const { messages } = useChatStore();
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<div className="flex flex-col">
			{messages.map((message, index) => (
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
			))}
		</div>
	);
};

export default ChatMessageList;
