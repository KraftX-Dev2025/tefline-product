import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromptExamplesProps {
    prompts: string[];
    toolUrl: string;
    maxDisplayed?: number;
}

export default function PromptExamples({
    prompts,
    toolUrl,
    maxDisplayed = 3,
}: PromptExamplesProps) {
    // Limit the number of prompts displayed
    const displayedPrompts = prompts.slice(0, maxDisplayed);
    const hasMore = prompts.length > maxDisplayed;

    const promptVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3,
            },
        }),
    };

    return (
        <div className="space-y-2">
            {displayedPrompts.map((prompt, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    variants={promptVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative group"
                >
                    <div className="flex border border-gray-200 rounded-md overflow-hidden">
                        <div className="bg-gray-50 p-2 flex items-center justify-center">
                            <MessageSquare
                                size={16}
                                className="text-[#3CCBC9]"
                            />
                        </div>

                        <div className="flex-grow p-2 text-xs font-normal text-gray-600">
                            {prompt}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white opacity-0 group-hover:opacity-100 flex items-center justify-end pr-2 transition-opacity">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 bg-[#3CCBC9]/10 text-[#3CCBC9] hover:bg-[#3CCBC9]/20"
                                asChild
                            >
                                <a
                                    href={`${toolUrl}?prompt=${encodeURIComponent(
                                        prompt
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Try this prompt"
                                >
                                    <ExternalLink size={14} />
                                </a>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ))}

            {hasMore && (
                <div className="text-xs text-gray-400 pt-1 pl-2">
                    {prompts.length - maxDisplayed} more example(s) available...
                </div>
            )}

            <div className="text-xs text-gray-400 mt-2 italic">
                Click on any example to try it directly in the AI tool
            </div>
        </div>
    );
}
