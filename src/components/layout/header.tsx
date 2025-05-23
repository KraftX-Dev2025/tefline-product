"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

interface HeaderProps {
    toggleSidebar?: () => void;
    showSidebarToggle?: boolean;
}

export default function Header({
    toggleSidebar,
    showSidebarToggle = true,
}: HeaderProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState(2); // Example notification count

    useEffect(() => {
        const checkAuthStatus = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getSession();
            setIsLoggedIn(!!data.session);
            setLoading(false);
        };

        checkAuthStatus();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auth links for non-logged in users
    const authLinks = [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
    ];

    // Get page title based on pathname
    const getPageTitle = () => {
        if (pathname === "/") return "Dashboard";
        if (pathname === "/help") return "Help Center";
        if (pathname === "/settings") return "Settings";
        if (pathname === "/login") return "Login";
        if (pathname === "/register") return "Register";

        // Convert pathname to title case
        const title = pathname.split("/")[1];
        return title.charAt(0).toUpperCase() + title.slice(1);
    };

    // Check if user is on auth pages
    const isOnAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <header
            className={cn(
                "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-lg shadow-sm"
                    : "bg-white"
            )}
        >
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                {/* Left section - Logo & menu toggle */}
                <div className="flex items-center">
                    {showSidebarToggle && isLoggedIn && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={toggleSidebar}
                        >
                            <Menu size={22} />
                        </Button>
                    )}

                    <Link href="/" className="flex items-center md:hidden">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                                src="/favicon.png"
                                alt="Tefline Logo"
                                width={32}
                                height={32}
                            />
                        </div>
                    </Link>

                    {/* Page title for desktop */}
                    <h1 className="text-xl font-semibold text-gray-800 ml-2 hidden md:block">
                        {getPageTitle()}
                    </h1>
                </div>

                {/* Center - Page title for mobile */}
                <div className="md:hidden">
                    <h1 className="text-lg font-medium text-gray-800">
                        {getPageTitle()}
                    </h1>
                </div>

                {/* Right section - Actions & user */}
                {!loading && (
                    <div className="flex items-center space-x-3">
                        {isLoggedIn ? (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative"
                                >
                                    <Bell size={20} />
                                    {notifications > 0 && (
                                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                            {notifications}
                                        </span>
                                    )}
                                </Button>

                                <Link href="/profile">
                                    <div className="w-8 h-8 bg-gradient-to-r from-[#3CCBC9]/20 to-[#935DFD]/20 rounded-full flex items-center justify-center text-[#3CCBC9] font-medium">
                                        U
                                    </div>
                                </Link>
                            </>
                        ) : (
                            // Only show auth buttons if not on auth pages
                            !isOnAuthPage && (
                                <div className="flex space-x-2">
                                    {authLinks.map((link) => (
                                        <Link key={link.name} href={link.href}>
                                            <Button
                                                variant={
                                                    link.name === "Login"
                                                        ? "outline"
                                                        : "gradient"
                                                }
                                                size="sm"
                                                className={
                                                    link.name === "Register"
                                                        ? "font-bold"
                                                        : ""
                                                }
                                            >
                                                {link.name}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}