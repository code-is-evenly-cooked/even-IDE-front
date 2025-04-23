import { useChat } from "@/hooks/useChat";
import MessageInput from "./common/MessageInput";

const ChatInput = () => {
	const { sendMessage } = useChat();

	return <MessageInput onSubmit={(message) => sendMessage(message)} />;
};

export default ChatInput;
