import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const interSans = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
	display: "swap",
});

const montserratSans = Montserrat({
	variable: "--font-montserrat-sans",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Escaneou! - Gerador de QR Code Online",
	description:
		"Crie QR Codes personalizados de forma rápida e fácil com o Escaneou! Simples, gratuito e sem complicação.",
	robots: "index, follow",
	viewport: "width=device-width, initial-scale=1.0",
	openGraph: {
		type: "website",
		title: "Escaneou! - Gerador de QR Code Online",
		description:
			"Crie QR Codes personalizados de forma rápida e fácil com o Escaneou! Simples, gratuito e sem complicação.",
		images: [
			{
				url: "https://images.unsplash.com/photo-1595079676714-d804bc1095b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				width: 1200,
				height: 630,
				alt: "Escaneou! - Gerador de QR Code Online",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="pt-BR"
			className={`${interSans.variable} ${montserratSans.variable}`}
		>
			<body className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-slate-900 antialiased font-inter">
				{children}
			</body>
		</html>
	);
}
