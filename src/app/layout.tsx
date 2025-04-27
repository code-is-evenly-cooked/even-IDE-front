import type { Metadata } from "next";
import "@/app/globals.css";
import Layout from "@/components/layout/Layout";
import AppProviders from "@/providers/AppProviders";
import LoginModals from "@/components/modal/LoginModals";
import ToastContainer from "@/components/common/Toast/ToastContainer";

export const metadata: Metadata = {
	title: "Even IDE",
	description: "Coding with Even IDE",
	icons: {
		icon: `favicon.svg`
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body>
				<AppProviders>
					<Layout>
						{children}
						<ToastContainer />
						<LoginModals />
					</Layout>
				</AppProviders>
			</body>
		</html>
	);
}
