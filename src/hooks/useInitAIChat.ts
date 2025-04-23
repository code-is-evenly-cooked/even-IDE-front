import { getAllMessages, saveMessage } from "@/lib/indexedDB";
import { useAIChatStore } from "@/stores/useAIChatStore";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useInitAIChat = () => {
	const setMessages = useAIChatStore((state) => state.setMessages);
	const appendMessage = useAIChatStore((state) => state.appendMessage);

	const initMessages = async () => {
		const messages = await getAllMessages();

		if (messages.length === 0) {
			const welcomeMessage = {
				id: uuidv4(),
				role: "assistant" as const,
				content: "안녕하세요! 당신과 함께 할 이분희입니다.",
				timestamp: Date.now(),
				nickname: "이분희",
			};
			await saveMessage(welcomeMessage);
			appendMessage(welcomeMessage);
			setMessages([welcomeMessage]);
		} else {
			setMessages(messages);
		}
	};

	useEffect(() => {
		initMessages();
	}, [setMessages]);
};

export default useInitAIChat;
