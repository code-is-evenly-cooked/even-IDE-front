"use client";

import { useAIChatStore } from "@/stores/useAIChatStore";
import { useEffect, useRef } from "react";

const AIMessageList = () => {
	const messages = useAIChatStore((state) => state.messages);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, [messages]);
	return (
		<div className="flex flex-col justify-end min-h-full">
			{messages.map((message, index) => (
				<div
					key={index}
					className="flex flex-col p-2 gap-y-0.5 text-sm text-white hover:bg-transparent/10"
					ref={index === 0 ? bottomRef : null}
				>
					<span className="font-semibold">{message.nickname}</span>
					<span>{message.content}</span>
				</div>
			))}
		</div>
	);
};

export default AIMessageList;
