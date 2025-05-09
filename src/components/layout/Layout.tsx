"use client";

import useAuthInitializer from "@/hooks/useAuthInitializer";
import React, { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	useAuthInitializer();
	return (
		<div className="h-screen">
			<main>{children}</main>
		</div>
	);
};

export default Layout;
