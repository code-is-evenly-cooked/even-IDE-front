"use client";

import { usePanelStore } from "@/stores/usePanelState";
import { useChatStore } from "@/stores/useChatStore";

import ChatModal from "./Chat/ChatModal";
import ChatPanel from "./Chat/ChatPanel";
import AIPanel from "./Chat/AI/AIPanel";
import MemoPanel from "./Memo/MemoPanel";

const RightPanel = () => {
	const { viewMode } = useChatStore();
	const { activePanel } = usePanelStore();

	if (!activePanel) return null;

	return (
		<>
			{activePanel === "chat" && viewMode === "panel" && <ChatPanel />}
			{activePanel === "chat" && viewMode === "modal" && <ChatModal />}
			{activePanel === "memo" && <MemoPanel />}
			{activePanel === "ai" && <AIPanel />}
		</>
	);
};

export default RightPanel;