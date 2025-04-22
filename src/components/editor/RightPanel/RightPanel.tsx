"use client";

import { usePanelStore } from "@/stores/usePanelState";
import ChatModal from "./Chat/ChatModal";
import ChatPanel from "./Chat/ChatPanel";
import AIPanel from "./AI/AIPanel";

const RightPanel = () => {
	const { activePanel } = usePanelStore();
	return (
		<>
			{activePanel === "chat" && (
				<>
					<ChatPanel />
					<ChatModal />
				</>
			)}
			{activePanel === "ai" && (
				<>
					<AIPanel />
				</>
			)}
		</>
	);
};

export default RightPanel;
