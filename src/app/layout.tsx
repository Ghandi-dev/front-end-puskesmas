import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "@/components/providers/AuthProvider";
import ProviderQueryClient from "@/components/providers/ProviderQueryClient";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Puskesmas",
	description: "Sistem Informasi Pencatatan Aset Puskesmas",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthProvider session={session}>
					<ProviderQueryClient>{children}</ProviderQueryClient>
				</AuthProvider>
				<Toaster richColors position="top-right" />
			</body>
		</html>
	);
}
