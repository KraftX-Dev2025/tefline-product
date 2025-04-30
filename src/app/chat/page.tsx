"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Info, ExternalLink } from "lucide-react";
import HeroSection from "@/components/layout/hero-section";
import ChatInterface from "@/components/chat/chat-interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { SUGGESTED_CHATBOT_PROMPTS } from "@/constants/chatbot-prompts";
import { AI_TOOLS } from "@/constants/ai-tools";

export default function ChatPage() {
    // Mark chat task as completed when visiting this page
    useEffect(() => {
        const tasks = getFromLocalStorage("tasks", []);
        const updatedTasks = tasks.map((task: any) => {
            if (task.id === "chat-with-guide") {
                return { ...task, completed: true };
            }
            return task;
        });
        saveToLocalStorage("tasks", updatedTasks);
    }, []);

    return (
        <>
            <HeroSection
                title="Chat with AI Guide"
                subtitle="Get help navigating Tefline's resources and personalized wellness guidance"
                bgPattern
                gradient
                centered
                size="sm"
            />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar with information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* About AI Guide */}
                        <Card className="bg-card/40 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <Info
                                            size={18}
                                            className="text-primary"
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        About AI Guide
                                    </h3>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    The AI Guide helps you navigate Tefline's
                                    resources and features. It can:
                                </p>

                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">
                                            •
                                        </span>
                                        <span>
                                            Explain how to use our Google Drive
                                            resources
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">
                                            •
                                        </span>
                                        <span>
                                            Guide you on how to use the
                                            specialized AI tools
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">
                                            •
                                        </span>
                                        <span>
                                            Answer basic questions about
                                            wellness and lifestyle medicine
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">
                                            •
                                        </span>
                                        <span>
                                            Help you track your progress toward
                                            your wellness goals
                                        </span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Suggested Questions */}
                        <Card className="bg-card/40 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <MessageCircle
                                            size={18}
                                            className="text-primary"
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        Try Asking
                                    </h3>
                                </div>

                                <ul className="space-y-3">
                                    {SUGGESTED_CHATBOT_PROMPTS.map(
                                        (prompt, index) => (
                                            <li
                                                key={index}
                                                className="text-sm bg-secondary/30 p-3 rounded-md"
                                            >
                                                "{prompt}"
                                            </li>
                                        )
                                    )}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Specialized AI Tools */}
                        <Card className="bg-card/40 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <ExternalLink
                                            size={18}
                                            className="text-primary"
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        Specialized AI Tools
                                    </h3>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    For more in-depth, specialized guidance, try
                                    our dedicated AI tools:
                                </p>

                                <div className="space-y-3">
                                    {AI_TOOLS.map((tool) => (
                                        <Button
                                            key={tool.id}
                                            variant="glass"
                                            className="w-full justify-start"
                                            asChild
                                        >
                                            <a
                                                href={tool.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center"
                                            >
                                                <span>{tool.title}</span>
                                                <ExternalLink
                                                    size={14}
                                                    className="ml-auto"
                                                />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Chat Interface */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <ChatInterface />
                    </motion.div>
                </div>
            </div>
        </>
    );
}
