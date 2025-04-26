import { useAIChatStore } from "@/stores/useAIChatStore";
import MessageInput from "../common/MessageInput";
import { requestAIResponse } from "./requestAIResponse";
import useRequireLogin from "@/hooks/useRequireLogin";

const AIInput = () => {
	const isLoading = useAIChatStore((state) => state.isLoading);
	const { checkLogin } = useRequireLogin();

	const handleSubmit = async (prompt: string) => {
		if (!checkLogin()) return;

		try {
			await requestAIResponse(prompt);
		} catch (err) {
			console.log(err);
		}
	};

	return <MessageInput onSubmit={handleSubmit} disabled={isLoading} />;
};

export default AIInput;
