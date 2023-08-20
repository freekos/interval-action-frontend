import "./styles/index.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EffectorNext } from "@effector/next";

export const metadata: Metadata = {
	title: "Time Action",
	description: "Time Action is app for time check",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
