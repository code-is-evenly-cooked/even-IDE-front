"use client";

import useInitAIChat from "@/hooks/useInitAIChat";
import ChatInput from "../ChatInput";
import AIMessageList from "./AIMessageList";
import AITitle from "./AITitle";
import AIInput from "./AIInput";

const AIPanel = () => {
	useInitAIChat();

	return (
		<aside className="w-[320px] h-full bg-gray800 border-none flex flex-col">
			<AITitle />
			<div className="flex-1 overflow-y-auto p-1">
				<AIMessageList />
			</div>
			<AIInput />
		</aside>
	);
};

export default AIPanel;
