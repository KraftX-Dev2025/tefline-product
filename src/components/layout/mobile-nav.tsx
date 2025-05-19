"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Home,
    BookOpen,
    BrainCircuit,
    MessageSquare,
    User,
    Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
    onQuickActionClick?: () => void;
}

const MobileNav = ({ onQuickActionClick }: MobileNavProps) => {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "Home", href: "/" },
        { icon: BookOpen, label: "Resources", href: "/resources" },
        { icon: BrainCircuit, label: "AI Tools", href: "/ai-tools" },
        { icon: User, label: "Profile", href: "/profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 md:hidden z-50">
            <div className="grid grid-cols-5 h-full relative">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center",
                                isActive ? "text-teal-600" : "text-gray-500"
                            )}
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="mobileNavIndicator"
                                    className="absolute bottom-0 h-1 w-12 bg-teal-500 rounded-t-full"
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </Link>
                    );
                })}

                {/* Center quick action button */}
                <div className="flex justify-center items-center">
                    <Button
                        size="icon"
                        variant="gradient"
                        className="rounded-full h-14 w-14 shadow-lg absolute -top-7"
                        onClick={onQuickActionClick}
                    >
                        <Link href="/chat">
                            <MessageSquare size={24} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
