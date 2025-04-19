import React, { useRef, useState } from "react";
import SendButton from "./SendButton";

const ChatInput = () => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState("");

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setMessage(value);
		e.target.style.height = "auto"; // 높이 초기화
		e.target.style.height = `${Math.min(e.target.scrollHeight, 64)}px`;
	};

	const handleSend = () => {
		if (!message.trim()) return;
		console.log("전송하는 메세지", message);
		setMessage("");

		requestAnimationFrame(() => {
			textAreaRef.current?.focus();
			scrollRef.current?.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			});
		});
	};
	return (
		<div className="p-4 flex items-end gap-2">
			<textarea
				rows={1}
				className="
				w-full px-3 py-2 text-gray200 text-body-2 font-medium scrollbar-hide
				rounded-2xl resize-none placeholder:text-gray500 bg-gray900
				focus:border-violet600 focus:shadow-violetGlow focus:outline-none focus:ring-0
				"
				placeholder="내용을 입력하세요"
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						handleSend();
					}
				}}
				onInput={handleInput}
				value={message}
			/>
			<SendButton disabled={message.trim() === ""} onClick={handleSend} />
		</div>
	);
};

export default ChatInput;
