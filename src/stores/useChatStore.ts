import { ChatMessageType } from "@/types/chat";
import { create } from "zustand";

export type ChatViewMode = "panel" | "modal";

export interface ChatMessage {
	type: ChatMessageType;
	projectId: string;
	sender: string;
	nickname: string;
	content: string;
	timestamp?: string;
}

interface ChatState {
	// UI 상태
	isVisible: boolean;
	viewMode: ChatViewMode;
	toggleVisibility: () => void;
	setViewMode: (mode: ChatViewMode) => void;

	// 메세지 상태
	messages: ChatMessage[];
	appendMessage: (message: ChatMessage) => void;
	setMessages: (messages: ChatMessage[]) => void;

	// 유저 정보
	sender: string;
	nickname: string;
	setSenderInfo: (sender: string, nickname: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
	isVisible: true,
	viewMode: "panel",
	toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
	setViewMode: (mode) => set({ viewMode: mode }),

	messages: [],
	appendMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	setMessages: (messages) => set(() => ({ messages })),

	sender: "",
	nickname: "",
	setSenderInfo: (sender, nickname) => set({ sender, nickname }),
}));
