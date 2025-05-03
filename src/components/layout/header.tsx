"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Menu,
    X,
    Home,
    BookOpen,
    BrainCircuit,
    MessageCircle,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "AI Tools", href: "/ai-tools", icon: BrainCircuit },
    { name: "Chat", href: "/chat", icon: MessageCircle },
    { name: "Profile", href: "/profile", icon: User },
];

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-lg shadow-sm"
                    : "bg-white"
            )}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-2xl font-bold text-teal-500">
                            Tefline
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center space-x-1 text-sm font-medium transition-colors hover:text-teal-500",
                                    isActive
                                        ? "text-teal-500"
                                        : "text-gray-600"
                                )}
                            >
                                <Icon size={16} />
                                <span>{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute bottom-[-10px] left-0 right-0 h-[3px] bg-teal-300 rounded-full"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white border-b border-gray-200"
                >
                    <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-2 p-2 rounded-md",
                                        isActive
                                            ? "bg-teal-50 text-teal-500"
                                            : "text-gray-600 hover:bg-gray-50"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </motion.div>
            )}
        </header>
    );
}