import type { Metadata } from "next";
import "@/app/globals.css";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
	title: "Even IDE",
	description: "Coding with Even IDE",
};

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
		<body>
		<Layout>{children}</Layout>
		</body>
		</html>
	);
}