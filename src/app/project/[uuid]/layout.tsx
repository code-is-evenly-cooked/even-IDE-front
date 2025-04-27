import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Even IDE - Project",
  description: "Project workspace on Even IDE",
  icons: {
    icon: `/favicon.svg`,
  },
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}