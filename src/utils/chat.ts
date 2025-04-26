import { ChatMessage } from "@/stores/useChatStore";
import dayjs from "dayjs";

export const chatDateConverter = (messages: ChatMessage[]): ChatMessage[] => {
	const result: ChatMessage[] = [];
	let lastDate: string | null = null;

	for (const message of messages) {
		const date = message.timestamp
			? dayjs(message.timestamp).format("YYYY.MM.DD")
			: null;

		if (date && date !== lastDate) {
			result.push({
				type: "DATE",
				projectId: message.projectId,
				sender: message.sender,
				nickname: message.nickname,
				content: dayjs(message.timestamp).format("YYYY.MM.DD"),
			});
			lastDate = date;
		}
		result.push(message);
	}
	return result;
};
