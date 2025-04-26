import { useChat } from "@/hooks/useChat";
import MessageInput from "./common/MessageInput";

const ChatInput = () => {
	const { sendMessage, connected } = useChat();

	return (
		<MessageInput
			onSubmit={(message) => sendMessage(message)}
			disabled={!connected}
		/>
	);
};

export default ChatInput;
