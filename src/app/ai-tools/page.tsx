"use client";

import { motion } from "framer-motion";
import {
    MessageSquare,
    BrainCircuit,
    ArrowRight,
    Circle,
    CheckCircle,
    Lightbulb,
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
                size="md"
            />

            <div className="container mx-auto px-4 py-12">
                {/* Introduction Card */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <Card className="bg-card/50 backdrop-blur-sm overflow-hidden border-primary/10">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                            <div className="absolute top-0 -left-10 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl" />
                            <div className="absolute bottom-0 -right-10 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl" />
                        </div>

                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <BrainCircuit
                                        size={32}
                                        className="text-primary"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold mb-2">
                                        Enhance Your Wellness with AI
                                    </h2>
                                    <p className="text-muted-foreground">
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
                <h2 className="text-2xl font-bold mb-6">
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

                {/* How to Use Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-16"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <Lightbulb size={24} className="mr-2 text-primary" />
                        How to Use Our AI Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Be Specific",
                                icon: Circle,
                                description:
                                    "Provide specific details about your goals and situation for more personalized recommendations.",
                            },
                            {
                                title: "Ask Follow-Ups",
                                icon: ArrowRight,
                                description:
                                    "Don't hesitate to ask follow-up questions to dig deeper into topics you're interested in.",
                            },
                            {
                                title: "Combine Topics",
                                icon: MessageSquare,
                                description:
                                    "Try asking about multiple wellness aspects at once, such as how nutrition impacts sleep.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-card/40 backdrop-blur-sm rounded-lg border border-border p-6"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-full bg-accent/10 text-accent">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
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
                    <Card className="bg-card/30 backdrop-blur-sm border-border">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                <CheckCircle
                                    size={18}
                                    className="mr-2 text-primary"
                                />
                                Tips for Getting the Best Results
                            </h3>

                            <ul className="space-y-2">
                                {AI_TOOL_USAGE_TIPS.map((tip, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <span className="mr-2 text-primary">
                                            •
                                        </span>
                                        <span className="text-muted-foreground">
                                            {tip}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
