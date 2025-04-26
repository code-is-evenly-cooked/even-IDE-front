"use client";

import ChatModal from "./Chat/ChatModal";
import ChatPanel from "./Chat/ChatPanel";
import MemoPanel from "./Memo/MemoPanel";

const RightPanel = () => {
	return (
		<>
			<ChatPanel />
			<ChatModal />
			<MemoPanel />
		</>
	);
};

export default RightPanel;