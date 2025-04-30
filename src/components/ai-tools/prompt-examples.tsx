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
                    <div className="flex border border-border/60 rounded-md overflow-hidden">
                        <div className="bg-secondary/30 p-2 flex items-center justify-center">
                            <MessageSquare
                                size={16}
                                className="text-muted-foreground"
                            />
                        </div>

                        <div className="flex-grow p-2 text-xs font-normal">
                            {prompt}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card opacity-0 group-hover:opacity-100 flex items-center justify-end pr-2 transition-opacity">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 bg-primary/10"
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
                <div className="text-xs text-muted-foreground pt-1 pl-2">
                    {prompts.length - maxDisplayed} more example(s) available...
                </div>
            )}

            <div className="text-xs text-muted-foreground mt-2 italic">
                Click on any example to try it directly in the AI tool
            </div>
        </div>
    );
}
