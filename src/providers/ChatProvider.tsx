"use client";

import { resolveNickname } from "@/lib/useChatIdentity";
import { getAuthCookie } from "@/lib/cookie";
import { ChatMessage, useChatStore } from "@/stores/useChatStore";
import { useProjectStore } from "@/stores/useProjectStore";
import {
	ChatJoinPayload,
	ChatJoinResponse,
	ChatSendPayload,
} from "@/types/chat";
import { Client } from "@stomp/stompjs";
import { createContext, useEffect, useRef } from "react";
import SockJS from "sockjs-client";

interface ChatContextValue {
	sendMessage: (content: string) => void;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

interface ChatProviderProps {
	children: React.ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
	const clientRef = useRef<Client | null>(null);
	const sendMessagePathRef = useRef<string | null>(null);
	const { setSenderInfo, appendMessage, setMessages, sender, nickname } =
		useChatStore();

	const projectId = useProjectStore((state) => state.projectId);

	const connect = async () => {
		const accessToken = getAuthCookie();

		try {
			// 입장 API 호출
			const res = await fetch("/api/chat/join", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				},
				body: JSON.stringify({ projectId }),
			});

			const data: ChatJoinResponse = await res.json();
			const { sender, nickname, chat } = data;
			const { subscribeTopic, sendJoinPath, sendMessagePath } = chat;

			const nickNameToUse = resolveNickname(nickname);
			setSenderInfo(sender, nickNameToUse);
			sendMessagePathRef.current = sendMessagePath;

			// History API
			const historyRes = await fetch(
				`/api/chat/history?projectId=${projectId}`
			);
			const historyData: ChatMessage[] = await historyRes.json();
			setMessages(historyData);

			// WebSocket 연결
			const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL!}/ws`);
			const client = new Client({
				webSocketFactory: () => socket,
				reconnectDelay: 5000,
				debug: () => {},
			});

			client.onConnect = () => {
				console.log("WebSocket connected");

				// 구독 시작
				client.subscribe(subscribeTopic, (message) => {
					const body: ChatMessage = JSON.parse(message.body);
					console.log("메시지 수신:", body);
					appendMessage(body);
				});

				// 입장 메세지 전송
				const joinPayload: ChatJoinPayload = {
					type: "JOIN",
					projectId: projectId ?? 0,
					sender,
					nickname: nickNameToUse,
				};
				console.log("입장 메시지 전송:", joinPayload);

				client.publish({
					destination: sendJoinPath,
					body: JSON.stringify(joinPayload),
				});
			};

			client.activate();
			clientRef.current = client;
		} catch (err) {
			console.error("Error connecting to WebSocket -> ", err);
		}
	};

	const sendMessage = (content: string) => {
		const client = clientRef.current;
		const destination = sendMessagePathRef.current;
		if (!client || !client.connected || !destination) return;

		const payload: ChatSendPayload = {
			type: "MESSAGE",
			projectId: projectId ?? 0,
			sender,
			nickname,
			content,
		};

		console.log("메시지 전송:", payload);

		client.publish({
			destination: destination,
			body: JSON.stringify(payload),
		});
	};

	useEffect(() => {
		if (!projectId) return;
		connect();

		return () => {
			clientRef.current?.deactivate();
		};
	}, [projectId]);

	return (
		<ChatContext.Provider value={{ sendMessage }}>
			{children}
		</ChatContext.Provider>
	);
};
