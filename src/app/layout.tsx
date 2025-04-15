// src/app/layout.tsx
import "@/app/globals.css";
import AppProviders from "@/components/auth/AppProviders";

export const metadata = {
    title: "Even IDE",
    description: "Coding with Even IDE",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body>
        <AppProviders>{children}</AppProviders>
        </body>
        </html>
    );
}
