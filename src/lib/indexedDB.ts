import { openDB } from "idb";

const DB_NAME = "ai-chat-db";
const STORE_NAME = "ai-messages";

export interface AIChatMessage {
	id: string; // UUID
	role: "user" | "assistant";
	content: string;
	timestamp: number;
	nickname: string;
}

export const getDB = () =>
	openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: "id" });
			}
		},
	});

export const saveMessage = async (message: AIChatMessage) => {
	const db = await getDB();
	await db.put(STORE_NAME, message);
};

export const getAllMessages = async (): Promise<AIChatMessage[]> => {
	const db = await getDB();
	return db.getAll(STORE_NAME);
};
