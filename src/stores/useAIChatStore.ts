import { create } from "zustand";

type AIMessageRole = "user" | "assistant";

export interface AIChatMessage {
	id: string; // UUID
	role: AIMessageRole;
	content: string;
	timestamp: number;
	nickname: string;
}

interface AIChatState {
	messages: AIChatMessage[];
	isLoading: boolean;
	setMessages: (messages: AIChatMessage[]) => void;
	appendMessage: (message: AIChatMessage) => void;
	setIsLoading: (loading: boolean) => void;
	clearMessages: () => void;
}

export const useAIChatStore = create<AIChatState>((set) => ({
	messages: [],
	isLoading: false,
	setMessages: (messages) => set({ messages: messages }),
	appendMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	setIsLoading: (loading) => set({ isLoading: loading }),
	clearMessages: () => set({ messages: [] }),
}));
