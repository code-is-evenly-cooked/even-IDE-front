export type ChatMessageType = "JOIN" | "MESSAGE" | "DATE";

export interface ChatMessage {
	type: ChatMessageType;
	projectId: string;
	sender: string;
	nickname: string;
	content: string;
	timestamp?: string;
}

export interface ChatJoinResponse {
	projectId: number;
	sender: string;
	nickname: string;
	chat: {
		subscribeTopic: string;
		sendJoinPath: string;
		sendMessagePath: string;
	};
}

export interface ChatJoinPayload {
	type: "JOIN";
	projectId: number;
	sender: string;
	nickname: string;
}

export interface ChatSendPayload {
	type: "MESSAGE";
	projectId: number;
	sender: string;
	nickname: string;
	content: string;
}
