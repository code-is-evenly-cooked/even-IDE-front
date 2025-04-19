import { ChatMessage, useChatStore } from "@/stores/useChatStore";
import {
	ChatJoinPayload,
	ChatJoinResponse,
	ChatSendPayload,
} from "@/types/chat";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";

const useChatSocket = (projectId: number) => {
	const clientRef = useRef<Client | null>(null);
	const { setSenderInfo, appendMessage, sender, nickname } = useChatStore();

	useEffect(() => {
		connect();

		return () => {
			clientRef.current?.deactivate();
		};
	}, [projectId]);

	const connect = async () => {
		try {
			// 입장 API 호출
			const res = await fetch("/api/chat/join", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ projectId }),
			});

			const data: ChatJoinResponse = await res.json();
			const { sender, nickname, chat } = data;
			const { subscribeTopic, sendJoinPath } = chat; // sendMessagePath

			setSenderInfo(sender, nickname);

			// WebSocket 연결
			// const socket = new SockJS("/ws");
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
					projectId,
					sender,
					nickname,
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
		if (!client || !client.connected) return;

		const payload: ChatSendPayload = {
			type: "MESSAGE",
			projectId,
			sender,
			nickname,
			content,
		};

		client.publish({
			destination: `app/chat.send`,
			body: JSON.stringify(payload),
		});
	};

	return { sendMessage };
};

export default useChatSocket;
