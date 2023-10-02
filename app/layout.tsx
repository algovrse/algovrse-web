import { ThemeProvider } from "@algovrse/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Cousine } from "next/font/google";

const baseFont = Cousine({
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["italic", "normal"],
});

export const metadata: Metadata = {
	title: "AlgoVrse",
	description:
		"Algovrse is a platform for sharing algorithm visualizations and learning algorithms.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={baseFont.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
