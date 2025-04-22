"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ChatProvider } from "./ChatProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
	return (
		<SessionProvider>
			<ChatProvider>{children}</ChatProvider>
		</SessionProvider>
	);
}
