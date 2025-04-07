import React, { ReactNode } from "react";
import Header from "./Header/Header";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="h-screen">
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
