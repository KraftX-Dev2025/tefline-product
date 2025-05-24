"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { mobileNavItems } from "@/constants/resources";

interface MobileNavProps {
    onQuickActionClick?: () => void;
}

const MobileNav = ({ onQuickActionClick }: MobileNavProps) => {
    const pathname = usePathname();
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const supabase = createClient();
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
        };
        getSession();
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    // Only render MobileNav if user is logged in
    if (!session) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 md:hidden z-50">
            <div className="grid grid-cols-5 h-full relative">
                {mobileNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center",
                                isActive ? "text-[#3CCBC9]" : "text-gray-500"
                            )}
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="mobileNavIndicator"
                                    className="absolute bottom-0 h-1 w-12 bg-gradient-to-r from-[#3CCBC9] to-[#935DFD] rounded-t-full"
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
