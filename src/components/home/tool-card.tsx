// src/components/home/tool-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ToolCardProps {
    id: string;
    title: string;
    description: string;
    iconImage: string;
    link: string;
    isExternal?: boolean;
    used?: boolean;
    index?: number;
}

export default function ToolCard({
    id,
    title,
    description,
    iconImage,
    link,
    isExternal = false,
    used = false,
    index = 0,
}: ToolCardProps) {
    return (
        <motion.div
            className="relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            {/* Used badge */}
            {used && (
                <div className="absolute top-3 right-3 bg-teal-100 text-teal-600 rounded-full px-2 py-1 text-xs font-medium flex items-center z-10">
                    <Check size={12} className="mr-1" />
                    Used
                </div>
            )}

            <div className="p-6">
                <div className="flex items-start space-x-4">
                    {/* Icon container - now bigger */}
                    <div
                        className="p-1 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center"
                        style={{ width: "68px", height: "68px" }}
                    >
                        <Image
                            src={`/${iconImage}.png`}
                            alt={title}
                            width={64}
                            height={64}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-teal-600 mb-1">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {description}
                        </p>

                        <Button
                            variant="gradient"
                            size="sm"
                            className="w-full"
                            asChild
                        >
                            {isExternal ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center"
                                >
                                    Try Now
                                    <ExternalLink size={14} className="ml-2" />
                                </a>
                            ) : (
                                <Link
                                    href={link}
                                    className="flex items-center justify-center"
                                >
                                    Open Now
                                </Link>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Activity illustration - also bigger */}
            <div className="absolute -z-10 bottom-0 right-0 opacity-10 w-full h-full">
                <div className="absolute bottom-0 right-0 w-32 h-32">
                    <Image
                        src={`/${iconImage}.png`}
                        alt={title}
                        width={128}
                        height={128}
                        className="opacity-20"
                    />
                </div>
            </div>
        </motion.div>
    );
}
