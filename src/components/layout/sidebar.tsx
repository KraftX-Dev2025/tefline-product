"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Home,
    BookOpen,
    BrainCircuit,
    MessageSquare,
    User,
    Settings,
    LogOut,
    HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { sibeBarNavItems } from "@/constants/resources";

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    isActive: boolean;
    onClick?: () => void;
}

const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive,
    onClick,
}: NavItemProps) => {
    return (
        <Link href={href} className="group" onClick={onClick}>
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full group-hover:bg-teal-50",
                    isActive
                        ? "bg-teal-100 text-[#3CCBC9]"
                        : "text-gray-500 hover:text-[#3CCBC9]"
                )}
            >
                <Icon size={20} className="mb-1" />
                <span className="text-xs font-medium">{label}</span>

                {isActive && (
                    <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#3CCBC9] to-[#935DFD] rounded-r-full top-1/2 -translate-y-1/2"
                        transition={{ duration: 0.2 }}
                    />
                )}
            </div>
        </Link>
    );
};

const Sidebar = () => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(true);
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    // Hide sidebar if not logged in
    if (!session) return null;

    return (
        <div
            className={cn(
                "h-screen sticky top-0 bg-white border-r border-gray-200 py-6 flex flex-col transition-all",
                expanded ? "w-56" : "w-20"
            )}
        >
            {/* Logo */}
            <div className="px-4 mb-8 flex justify-center items-center">
                <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                        src="/favicon.png"
                        alt="Tefline Logo"
                        width={40}
                        height={40}
                    />
                </div>
                {expanded && (
                    <span className="text-xl font-bold ml-2 gradient-text">
                        Tefline
                    </span>
                )}
            </div>

            {/* Toggle button */}
            {/* <button
                onClick={() => setExpanded(!expanded)}
                className="absolute right-0 top-8 translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-[#3CCBC9]"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={expanded ? "M10 12L6 8L10 4" : "M6 12L10 8L6 4"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button> */}

            {/* Nav Items */}
            <div className="flex-1 px-3 space-y-2 overflow-y-auto">
                {sibeBarNavItems.map((item) => (
                    <NavItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto px-3 space-y-2 mb-4">
                <NavItem
                    icon={HelpCircle}
                    label="Help"
                    href="/help"
                    isActive={pathname === "/help"}
                />
                <NavItem
                    icon={Settings}
                    label="Settings"
                    href="/settings"
                    isActive={pathname === "/settings"}
                />
                {/* <div className="pt-2 border-t border-gray-100 mt-2">
                    <Button
                        variant="outline"
                        className="w-full justify-start font-medium"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} className="mr-2" />
                        {expanded ? "Logout" : ""}
                    </Button>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
