"use client";

import { usePanelStore } from "@/stores/usePanelState";
import ChatModal from "./Chat/ChatModal";
import ChatPanel from "./Chat/ChatPanel";
import AIPanel from "./AI/AIPanel";
import { useChatStore } from "@/stores/useChatStore";

const RightPanel = () => {
	const { viewMode } = useChatStore();
	const { activePanel } = usePanelStore();

	if (!activePanel) return null;

	return (
		<>
			{activePanel === "chat" && viewMode === "panel" && <ChatPanel />}
			{activePanel === "chat" && viewMode === "modal" && <ChatModal />}
			{activePanel === "ai" && <AIPanel />}
		</>
	);
};

export default RightPanel;
