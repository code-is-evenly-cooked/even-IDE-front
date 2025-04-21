import { ChatContext } from "@/providers/ChatProvider";
import { useContext } from "react";

export const useChat = () => {
	const context = useContext(ChatContext);
	if (!context) throw new Error("useChat must be used within a ChatProvider");
	return context;
};
