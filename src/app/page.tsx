"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Check,
    ChevronRight,
    BookOpen,
    BrainCircuit,
    MessageCircle,
    Sparkles,
} from "lucide-react";
import HeroSection from "@/components/layout/hero-section";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserProfile, TaskItem } from "@/lib/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { AI_TOOLS } from "@/constants/ai-tools";
import { GOOGLE_DRIVE_FOLDER_URL } from "@/constants/resources";

// Define task items for onboarding checklist
const TASK_ITEMS: TaskItem[] = [
    {
        id: "explore-resources",
        title: "Explore Google Drive Resources",
        description:
            "Browse through our curated collection of wellness resources",
        completed: false,
        tutorialContent: `
      Our Google Drive folder contains organized resources on nutrition, fitness, mental health, and more.
      
      The documents are searchable, allowing you to quickly find information relevant to your wellness goals.
      
      Try searching for specific topics like "sleep improvement" or "stress management" using the search feature in Google Drive.
    `,
        link: GOOGLE_DRIVE_FOLDER_URL,
    },
    {
        id: "try-lifestyle-digital",
        title: "Try Lifestyle Digital GPT",
        description:
            "Get personalized wellness recommendations from our specialized AI",
        completed: false,
        tutorialContent: `
      Lifestyle Digital is an AI tool designed to provide personalized wellness recommendations based on lifestyle medicine principles.
      
      It can help with nutrition guidance, exercise routines, sleep improvement strategies, and stress management techniques.
      
      Try asking specific questions about your wellness goals to get tailored advice.
    `,
        link: AI_TOOLS[0].url,
    },
    {
        id: "try-cognitive-counselor",
        title: "Try Cognitive Counselor GPT",
        description: "Identify cognitive patterns and mental wellness insights",
        completed: false,
        tutorialContent: `
      Cognitive Counselor helps identify cognitive distortions and thought patterns that may be affecting your well-being.
      
      It provides insights into how your thinking influences your emotions and behaviors.
      
      Try sharing a challenging thought or situation to receive an analysis of your cognitive patterns.
    `,
        link: AI_TOOLS[1].url,
    },
    {
        id: "chat-with-guide",
        title: "Chat with AI Guide",
        description: "Get help navigating the platform and resources",
        completed: false,
        tutorialContent: `
      Our AI Guide can help you navigate the platform, find relevant resources, and understand how to use the specialized AI tools.
      
      It can answer questions about lifestyle medicine concepts and direct you to appropriate resources.
      
      Try asking how to make the most of the platform based on your wellness goals.
    `,
        link: "/chat",
    },
];

export default function HomePage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [tasks, setTasks] = useState<TaskItem[]>(TASK_ITEMS);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

    useEffect(() => {
        // Check if user has completed onboarding
        const profile = getFromLocalStorage<UserProfile | null>(
            "userProfile",
            null
        );
        setUserProfile(profile);

        // Get saved task status
        const savedTasks = getFromLocalStorage<TaskItem[]>("tasks", TASK_ITEMS);
        setTasks(savedTasks);

        // Redirect to onboarding if not completed
        if (!profile?.completedSetup) {
            router.push("/onboarding");
        }

        setLoading(false);
    }, [router]);

    const completedTasksCount = tasks.filter((task) => task.completed).length;
    const progress = (completedTasksCount / tasks.length) * 100;

    const markTaskCompleted = (taskId: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
        );

        setTasks(updatedTasks);
        saveToLocalStorage("tasks", updatedTasks);
    };

    const handleTaskClick = (task: TaskItem) => {
        setSelectedTask(task);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeroSection
                title="Welcome to Tefline"
                subtitle="Your intelligent companion for wellness and lifestyle medicine"
                bgPattern
                gradient
                centered
                size="md"
            />

            <div className="container mx-auto px-4 py-12">
                {/* Progress Section */}
                <div className="mb-12">
                    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-teal-500">
                                    Your Wellness Journey
                                </h2>
                                <p className="text-muted-foreground">
                                    Complete these tasks to get started with
                                    Tefline
                                </p>
                            </div>

                            <div className="mt-4 md:mt-0 bg-secondary/50 px-4 py-2 rounded-full">
                                <span className="text-sm font-medium">
                                    {completedTasksCount} of {tasks.length}{" "}
                                    completed
                                </span>
                            </div>
                        </div>

                        <Progress value={progress} className="h-2 mb-8" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                    }}
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    <Card
                                        className={`h-full cursor-pointer task-card ${task.completed
                                            ? "bg-primary/5 border-primary/20"
                                            : "bg-card/70"
                                            }`}
                                        onClick={() => handleTaskClick(task)}
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg">
                                                        {task.title}
                                                    </CardTitle>
                                                </div>
                                                <div
                                                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${task.completed
                                                        ? "bg-primary border-primary text-background"
                                                        : "border-muted-foreground"
                                                        }`}
                                                >
                                                    {task.completed && (
                                                        <Check size={14} />
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent>
                                            <CardDescription className="text-sm">
                                                {task.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feature Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Resources Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <BookOpen size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-teal-500">
                                Wellness Resources
                            </h2>
                        </div>

                        <p className="text-muted-foreground mb-4">
                            Access our curated collection of wellness resources
                            in Google Drive, including guides on nutrition,
                            fitness, sleep, and stress management.
                        </p>

                        <Button
                            variant="outline"
                            className="flex items-center"
                            asChild
                        >
                            <a href="/resources">
                                Browse Resources{" "}
                                <ChevronRight size={16} className="ml-1" />
                            </a>
                        </Button>
                    </motion.div>

                    {/* AI Tools Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <BrainCircuit size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-teal-500">AI Tools</h2>
                        </div>

                        <p className="text-muted-foreground mb-4">
                            Get personalized wellness recommendations and
                            cognitive insights from our specialized AI tools
                            designed for lifestyle medicine.
                        </p>

                        <Button
                            variant="outline"
                            className="flex items-center"
                            asChild
                        >
                            <a href="/ai-tools">
                                Explore AI Tools{" "}
                                <ChevronRight size={16} className="ml-1" />
                            </a>
                        </Button>
                    </motion.div>
                </div>

                {/* Chat Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 mb-12"
                >
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <MessageCircle size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-teal-500">AI Guide</h2>
                    </div>

                    <p className="text-muted-foreground mb-4">
                        Chat with our AI Guide to navigate the platform, find
                        relevant resources, and get answers to your wellness
                        questions.
                    </p>

                    <Button
                        variant="gradient"
                        className="flex items-center"
                        asChild
                    >
                        <a href="/chat">
                            Start Chatting{" "}
                            <Sparkles size={16} className="ml-1" />
                        </a>
                    </Button>
                </motion.div>
            </div>

            {/* Task Tutorial Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-lg w-full max-w-xl"
                    >
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">
                                {selectedTask.title}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {selectedTask.description}
                            </p>

                            <div className="bg-secondary/30 p-4 rounded-lg mb-6">
                                <h4 className="font-medium mb-2">
                                    How to use this feature:
                                </h4>
                                <div className="text-sm whitespace-pre-line">
                                    {selectedTask.tutorialContent}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedTask(null)}
                                >
                                    Close
                                </Button>

                                {selectedTask.link && (
                                    <Button
                                        variant="gradient"
                                        asChild
                                        onClick={() =>
                                            markTaskCompleted(selectedTask.id)
                                        }
                                    >
                                        <a
                                            href={selectedTask.link}
                                            target={
                                                selectedTask.link.startsWith(
                                                    "http"
                                                )
                                                    ? "_blank"
                                                    : "_self"
                                            }
                                            rel="noopener noreferrer"
                                        >
                                            Open & Mark Complete
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
