import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface VisualCardProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
    bgColor?: string;
    hoverEffect?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export function VisualCard({
    title,
    description,
    icon: Icon,
    iconBgColor = "bg-teal-100",
    iconColor = "text-teal-600",
    bgColor = "bg-white",
    hoverEffect = true,
    className,
    children,
    onClick,
}: VisualCardProps) {
    const CardComponent = onClick ? motion.button : motion.div;

    return (
        <CardComponent
            className={cn(
                "relative w-full rounded-xl border border-gray-100 shadow-sm p-5 overflow-hidden text-left",
                bgColor,
                hoverEffect &&
                    "transition-all hover:-translate-y-1 hover:shadow-md",
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
            whileHover={hoverEffect ? { y: -5 } : {}}
            whileTap={onClick ? { scale: 0.98 } : {}}
        >
            {/* Icon */}
            {Icon && (
                <div
                    className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-3`}
                >
                    <Icon size={24} className={iconColor} />
                </div>
            )}

            {/* Content */}
            <div>
                <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
                {description && (
                    <p className="text-gray-500 text-sm">{description}</p>
                )}

                {children && <div className="mt-3">{children}</div>}
            </div>
        </CardComponent>
    );
}
