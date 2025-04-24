"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ChatProvider } from "./ChatProvider";
import { useProjectStore } from "@/stores/useProjectStore";

export default function AppProviders({ children }: { children: ReactNode }) {
	const projectId = useProjectStore((state) => state.projectId);

	return (
		<SessionProvider>
			{projectId !== null ? <ChatProvider>{children}</ChatProvider> : children}
		</SessionProvider>
	);
}
