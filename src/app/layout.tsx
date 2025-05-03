import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "Tefline - Wellness & Lifestyle Medicine",
    description:
        "Your intelligent companion for wellness and lifestyle medicine",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <body className={`${inter.className} bg-white`}>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow pt-20">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}