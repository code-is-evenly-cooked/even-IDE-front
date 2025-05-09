import React, { useRef, useState } from "react";
import SendButton from "./SendButton";

interface MessageInputProps {
	onSubmit: (message: string) => void;
	disabled?: boolean;
}

const MessageInput = ({ onSubmit, disabled }: MessageInputProps) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState("");
	const [isComposing, setIsComposing] = useState(false);

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setMessage(value);
		e.target.style.height = "auto"; // 높이 초기화
		e.target.style.height = `${Math.min(e.target.scrollHeight, 64)}px`;
	};

	const handleSend = () => {
		const trimmedMessage = message.trim();
		if (!trimmedMessage) return;

		onSubmit(trimmedMessage);
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
				w-full px-3 py-2 text-white text-body-2 font-medium scrollbar-hide
				rounded-2xl resize-none placeholder:text-gray500 bg-gray900
				focus:border-violet600 focus:shadow-violetGlow focus:outline-none focus:ring-0
				"
				placeholder={disabled ? "프로젝트를 선택하세요" : "내용을 입력하세요"}
				disabled={disabled}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey && !isComposing) {
						e.preventDefault();
						handleSend();
					}
				}}
				onChange={(e) => setMessage(e.target.value)}
				onInput={handleInput}
				onCompositionStart={() => setIsComposing(true)}
				onCompositionEnd={() => setIsComposing(false)}
				value={message}
			/>
			<SendButton
				disabled={message.trim() === "" || disabled}
				onClick={handleSend}
			/>
		</div>
	);
};

export default MessageInput;
