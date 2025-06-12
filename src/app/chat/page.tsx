"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import HeroSection from "@/components/layout/hero-section";
import ChatInterface from "@/components/chat/chat-interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { aiToolSidebarCards } from "@/constants/resources";

export default function ChatPage() {
    const router = useRouter(); // useEffect(() => {
    //     const checkSession = async () => {
    //         const supabase = createClient();
    //         const {
    //             data: { session },
    //         } = await supabase.auth.getSession();

    //         if (!session) {
    //             router.push("/login");
    //         }
    //     };
    //     checkSession();
    // }, [router]);

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
                size="xs"
            />
            <div className="container mx-auto px-4 py-12">
                {/* Commented out sidebar - now using modals in ChatInterface */}
                {/* 
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {aiToolSidebarCards.map((card) => (
                            <Card
                                key={card.id}
                                className="bg-white backdrop-blur-sm border-gray-200 shadow-sm"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 rounded-full bg-[#3CCBC9]/10">
                                            <card.icon size={18} className="text-[#3CCBC9]" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {card.title}
                                        </h3>
                                    </div>

                                    {card.description && (
                                        <p className="text-sm text-gray-500 mb-4">{card.description}</p>
                                    )}

                                    {card.list && (
                                        <ul className="space-y-2 text-sm">
                                            {card.list.map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-[#3CCBC9] mr-2">•</span>
                                                    <span className="text-gray-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {card.promptList && (
                                        <ul className="space-y-3">
                                            {card.promptList.map((prompt, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm bg-[#3CCBC9]/5 p-3 rounded-md text-gray-600"
                                                >
                                                    "{prompt}"
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {card.toolList && (
                                        <div className="space-y-3">
                                            {card.toolList.map((tool) => (
                                                <Button
                                                    key={tool.id}
                                                    variant="outline"
                                                    className="w-full justify-start hover:bg-[#3CCBC9]/10 hover:text-[#3CCBC9] hover:border-[#3CCBC9]"
                                                    asChild
                                                >
                                                    <a
                                                        href={tool.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center"
                                                    >
                                                        <span>{tool.title}</span>
                                                        <ExternalLink size={14} className="ml-auto" />
                                                    </a>
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <ChatInterface />
                    </motion.div>
                </div>
                */}

                {/* Simplified layout - ChatInterface takes full width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-full h-full"
                >
                    <ChatInterface />
                </motion.div>
            </div>
        </>
    );
}
