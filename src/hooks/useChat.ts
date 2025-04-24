import { ChatContext } from "@/providers/ChatProvider";
import { useContext } from "react";

export const useChat = () => {
	const context = useContext(ChatContext);
	if (!context) {
		return {
			sendMessage: () => {
				console.warn("ChatProvider가 없어서 메시지 전송이 비활성화됩니다.");
			},
			connected: false,
		};
	}
	return { ...context, connected: true };
};
