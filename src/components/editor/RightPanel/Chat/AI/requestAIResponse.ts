import { saveMessage } from "@/lib/indexedDB";
import { requestAIAnswer } from "@/service/ai";
import { useAIChatStore } from "@/stores/useAIChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { v4 as uuidv4 } from "uuid";

export const requestAIResponse = async (prompt: string) => {
	const { accessToken, nickname } = useAuthStore.getState();
	const { appendMessage, setIsLoading } = useAIChatStore.getState();

	if (!accessToken) throw new Error("로그인 필요");

	const userMessage = {
		id: uuidv4(),
		role: "user" as const,
		content: prompt,
		timestamp: Date.now(),
		nickname: nickname ?? "사용자",
	};

	appendMessage(userMessage);
	await saveMessage(userMessage);

	try {
		setIsLoading(true);
		const { answer } = await requestAIAnswer(prompt);

		const aiMessage = {
			id: uuidv4(),
			role: "assistant" as const,
			content: answer,
			timestamp: Date.now(),
			nickname: "이분희",
		};
		appendMessage(aiMessage);
		await saveMessage(aiMessage);
	} catch (err) {
		throw err;
	} finally {
		setIsLoading(false);
	}
};
