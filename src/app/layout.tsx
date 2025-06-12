import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/mobile-nav";
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
            <body className={`${inter.className} bg-gray-50 w-full h-full`}>
                <div className="flex min-h-screen">
                    {/* Sidebar - hidden on mobile */}
                    <div className="hidden md:block">
                        <Sidebar />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <Header />
                        <main className="flex-grow p-4 md:p-6 pt-4 pb-20 md:pb-6">
                            {children}
                        </main>
                        <Footer />

                        {/* Mobile Navigation */}
                        <MobileNav />
                    </div>
                </div>
            </body>
        </html>
    );
}
