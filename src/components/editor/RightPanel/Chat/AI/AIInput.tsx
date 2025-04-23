import { useAIChatStore } from "@/stores/useAIChatStore";
import React from "react";
import MessageInput from "../common/MessageInput";
import { requestAIResponse } from "./requestAIResponse";

const AIInput = () => {
	const isLoading = useAIChatStore((state) => state.isLoading);
	return <MessageInput onSubmit={requestAIResponse} disabled={isLoading} />;
};

export default AIInput;
