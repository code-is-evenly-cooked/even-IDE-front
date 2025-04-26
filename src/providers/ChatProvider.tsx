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
import { Client, type StompSubscription } from "@stomp/stompjs";
import { createContext, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useIdeStore } from "@/stores/useIdeStore";

interface ChatContextValue {
	sendMessage: (content: string) => void;
	sendCodeUpdate: (content: string) => void; 
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
	const currentFileSubscriptionRef = useRef<StompSubscription | null>(null);
	const { currentFileId, updateFileContent } = useIdeStore();

	const accessToken = useAuthStore((state) => state.accessToken);
	const projectId = useProjectStore((state) => state.projectId);

	const connect = async () => {
		// 기존 연결 종료
		if (clientRef.current?.connected) {
			clientRef.current.deactivate();
		}
		const accessToken = getAuthCookie().token;

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
			const socket = new SockJS(
				`${process.env.NEXT_PUBLIC_API_BASE_URL!}/ws`,
				[],
				{
					withCredentials: true,
				}
			);
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

	// 파일별 웹소켓 구독
	const subscribeToFile = () => {
		const client = clientRef.current;
	
		if (!client || !client.connected || !projectId || !currentFileId) return;
	
		// 기존 구독 해제
		currentFileSubscriptionRef.current?.unsubscribe();
	
		const destination: string = `/topic/project/${projectId}/file/${currentFileId}`;

		console.log(`구독 시작 destination: ${destination}`);
	
		const subscription = client.subscribe(destination, (message) => {
			const data = JSON.parse(message.body);
			updateFileContent(currentFileId, data.content); // 현재 파일 id에 내용 업데이트
		});
	
		currentFileSubscriptionRef.current = subscription;
	};

	//코드 수정시
	const sendCodeUpdate = (content: string) => {
		const client = clientRef.current;
	
		if (!client || !client.connected || !projectId || !currentFileId || !sender || !nickname) return;
	
		const payload = {
			type: "CODE_UPDATE",
			projectId,
			fileId: currentFileId,
			sender,
			nickname,
			content,
			timestamp: new Date().toISOString(),
		};

		console.log("코드 업데이트 전송:", payload);
	
		client.publish({
			destination: `/app/code.update`,
			body: JSON.stringify(payload),
		});
	};

	useEffect(() => {
		if (!projectId) return;
		connect();

		return () => {
			clientRef.current?.deactivate();
		};
	}, [projectId, accessToken]);

	useEffect(() => {
		if (currentFileId) {
			subscribeToFile();
		}
	}, [currentFileId]);

	return (
		<ChatContext.Provider value={{ sendMessage, sendCodeUpdate }}>
			{children}
		</ChatContext.Provider>
	);
};
