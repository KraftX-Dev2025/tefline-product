"use client";

import { motion } from "framer-motion";
import {
    MessageSquare,
    BrainCircuit,
    ArrowRight,
    Circle,
    CheckCircle,
    Lightbulb,
    Sparkles,
    ExternalLink,
} from "lucide-react";
import HeroSection from "@/components/layout/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIToolCard from "@/components/ai-tools/ai-tool-card";
import { AI_TOOLS, AI_TOOL_USAGE_TIPS } from "@/constants/ai-tools";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { aiToolsOptions } from "@/constants/resources";

export default function AIToolsPage() {
    const [completedTools, setCompletedTools] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
            }
        };
        checkSession();
    }, [router]);

    useEffect(() => {
        // Load completed tools from localStorage
        const savedCompletedTools = getFromLocalStorage<string[]>(
            "completedAITools",
            []
        );
        setCompletedTools(savedCompletedTools);
    }, []);

    const markAsCompleted = (toolId: string) => {
        const updatedCompletedTools = [...completedTools];
        if (!updatedCompletedTools.includes(toolId)) {
            updatedCompletedTools.push(toolId);
            setCompletedTools(updatedCompletedTools);
            saveToLocalStorage("completedAITools", updatedCompletedTools);

            // Also update the main tasks if needed
            const tasks = getFromLocalStorage("tasks", []);
            const updatedTasks = tasks.map((task: any) => {
                if (
                    (toolId === "lifestyle-digital" &&
                        task.id === "try-lifestyle-digital") ||
                    (toolId === "cognitive-counselor" &&
                        task.id === "try-cognitive-counselor")
                ) {
                    return { ...task, completed: true };
                }
                return task;
            });
            saveToLocalStorage("tasks", updatedTasks);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <HeroSection
                title="AI Tools for Wellness"
                subtitle="Our specialized AI tools provide personalized guidance for your lifestyle medicine journey"
                bgPattern
                gradient
                centered
                size="xs"
            />

            <div className="container mx-auto px-4 py-12">
                {/* Introduction Card */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <Card className="bg-gradient-to-r from-[#3CCBC9]/10 to-[#935DFD]/10 backdrop-blur-sm overflow-hidden border-none shadow-sm">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                            <div className="absolute top-0 -left-10 w-72 h-72 bg-[#3CCBC9]/30 rounded-full filter blur-3xl" />
                            <div className="absolute bottom-0 -right-10 w-72 h-72 bg-[#935DFD]/30 rounded-full filter blur-3xl" />
                        </div>

                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="p-4 bg-white/80 rounded-full shadow-sm">
                                    <BrainCircuit
                                        size={40}
                                        className="text-[#3CCBC9]"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                                        Enhance Your Wellness with AI
                                    </h2>
                                    <p className="text-gray-600">
                                        Our AI tools are designed to provide
                                        personalized guidance based on lifestyle
                                        medicine principles. Each tool has a
                                        specialized focus to help you on your
                                        wellness journey.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* AI Tools */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Specialized AI Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {AI_TOOLS.map((tool, index) => (
                            <div
                                key={tool.id}
                                onClick={() => markAsCompleted(tool.id)}
                            >
                                <AIToolCard tool={tool} index={index} />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* How to Use Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-16"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                        <Lightbulb size={24} className="mr-2 text-[#3CCBC9]" />
                        How to Use Our AI Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aiToolsOptions.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white backdrop-blur-sm rounded-lg border border-gray-200 p-6 shadow-sm"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-full bg-[#3CCBC9]/10 text-[#3CCBC9]">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Usage Tips */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-12"
                >
                    <Card className="bg-white backdrop-blur-sm border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                                <CheckCircle
                                    size={18}
                                    className="mr-2 text-[#3CCBC9]"
                                />
                                Tips for Getting the Best Results
                            </h3>

                            <ul className="space-y-2">
                                {AI_TOOL_USAGE_TIPS.map((tip, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <span className="mr-2 text-[#3CCBC9]">
                                            •
                                        </span>
                                        <span className="text-gray-600">
                                            {tip}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Try ChatGPT integration banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12"
                >
                    <Card className="bg-gradient-to-r from-[#3CCBC9] to-[#935DFD] text-white border-none shadow-sm overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="mb-6 md:mb-0 md:mr-6">
                                    <h3 className="text-xl font-bold mb-2 flex items-center">
                                        <Sparkles className="mr-2" size={22} />
                                        Try Our Integrated ChatGPT Experience
                                    </h3>
                                    <p className="text-white/80 max-w-xl">
                                        Experience our AI tools directly within
                                        ChatGPT for a seamless wellness journey.
                                        Get personalized guidance, insights, and
                                        recommendations tailored to your
                                        specific needs.
                                    </p>
                                </div>
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="bg-white text-[#3CCBC9] hover:bg-white/90 shadow-md"
                                    asChild
                                >
                                    <a
                                        href="https://chatgpt.com/g/g-lECgVynsO-lifestyle-digital"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        Open in ChatGPT
                                        <ExternalLink
                                            size={16}
                                            className="ml-2"
                                        />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
