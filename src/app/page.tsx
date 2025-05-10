// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { UserProfile } from "@/lib/types";
import { AI_TOOLS } from "@/constants/ai-tools";

// Import our new components
import ProgressPath from "@/components/home/progress-path";
import ToolCard from "@/components/home/tool-card";
import WellnessGauge from "@/components/home/wellness-gauge";
import DailyTip from "@/components/home/daily-tip";
import MoodSelector from "@/components/home/mood-selector";
import ProgressChart from "@/components/home/progress-chart";
import HabitTracker from "@/components/home/habit-tracker";

// Define the journey steps
const JOURNEY_STEPS = [
    {
        id: "welcome",
        title: "Welcome",
        completed: true,
    },
    {
        id: "resources",
        title: "Resources",
        completed: false,
    },
    {
        id: "lifestyle-digital",
        title: "Lifestyle AI",
        completed: false,
    },
    {
        id: "cognitive",
        title: "Cognitive AI",
        completed: false,
    },
    {
        id: "chat-guide",
        title: "AI Guide",
        completed: false,
    },
    {
        id: "profile",
        title: "Complete Profile",
        completed: false,
        locked: true,
    },
];

// Main tools for quick access with appropriate image names
const MAIN_TOOLS = [
    {
        id: "resources",
        title: "Wellness Resources",
        description:
            "Access guides, worksheets, and materials on nutrition, fitness, and sleep",
        iconImage: "food",
        link: "/resources",
        isExternal: false,
    },
    {
        id: "lifestyle-digital",
        title: "Lifestyle Digital",
        description:
            "AI-powered personalized wellness recommendations and guidance",
        iconImage: "med",
        link: AI_TOOLS[0].url,
        isExternal: true,
    },
    {
        id: "cognitive-counselor",
        title: "Cognitive Counselor",
        description:
            "Identify cognitive patterns and get mental wellness insights",
        iconImage: "sleep",
        link: AI_TOOLS[1].url,
        isExternal: true,
    },
    {
        id: "chat-guide",
        title: "AI Guide Chat",
        description: "Get help navigating the platform and resources",
        iconImage: "ex",
        link: "/chat",
        isExternal: false,
    },
];

export default function DuolingoStyleHomePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [journeySteps, setJourneySteps] = useState(JOURNEY_STEPS);
    const [wellnessScore, setWellnessScore] = useState(75);
    const [previousScore, setPreviousScore] = useState(68);
    const [loading, setLoading] = useState(true);
    const [unreadMessages, setUnreadMessages] = useState(2);
    const [usedTools, setUsedTools] = useState<string[]>([]);

    // Effect for auth check
    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
                return;
            }

            setLoading(false);
        };

        checkSession();
    }, [router]);

    // Handler for step clicking in the journey path
    const handleStepClick = (stepId: string) => {
        const stepIndex = journeySteps.findIndex((step) => step.id === stepId);
        if (stepIndex >= 0 && !journeySteps[stepIndex].locked) {
            setCurrentStep(stepIndex);

            // Route to the appropriate page based on the step
            switch (stepId) {
                case "resources":
                    router.push("/resources");
                    markToolAsUsed("resources");
                    break;
                case "lifestyle-digital":
                    window.open(AI_TOOLS[0].url, "_blank");
                    markToolAsUsed("lifestyle-digital");
                    break;
                case "cognitive":
                    window.open(AI_TOOLS[1].url, "_blank");
                    markToolAsUsed("cognitive-counselor");
                    break;
                case "chat-guide":
                    router.push("/chat");
                    markToolAsUsed("chat-guide");
                    break;
                case "profile":
                    router.push("/profile");
                    break;
            }
        }
    };

    // Mark a tool as used when clicked - only updates React state, no localStorage
    const markToolAsUsed = (toolId: string) => {
        // Don't add duplicates
        if (!usedTools.includes(toolId)) {
            const updatedTools = [...usedTools, toolId];
            setUsedTools(updatedTools);

            // Update journey progress
            const updatedSteps = [...journeySteps];
            const stepIndex = updatedSteps.findIndex(
                (step) => step.id === toolId
            );
            if (stepIndex >= 0) {
                updatedSteps[stepIndex].completed = true;
                setJourneySteps(updatedSteps);
            }

            // Additional tool-specific effects
            if (toolId === "chat-guide") {
                setUnreadMessages(0);
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header title with subtle animation */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-teal-500">
                            Welcome to Tefline
                        </h1>
                        <p className="text-gray-600">
                            Your intelligent companion for wellness and
                            lifestyle medicine
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 mt-8">
                {/* Journey Progress Path */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8 overflow-x-auto">
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Your Wellness Journey
                        </h2>
                        <ProgressPath
                            steps={journeySteps}
                            currentStepIndex={currentStep}
                            onStepClick={handleStepClick}
                        />
                    </div>
                </div>

                {/* Tools Grid - easy access to main features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {MAIN_TOOLS.map((tool, index) => (
                        <div
                            key={tool.id}
                            onClick={() => markToolAsUsed(tool.id)}
                        >
                            <ToolCard
                                id={tool.id}
                                title={tool.title}
                                description={tool.description}
                                iconImage={tool.iconImage}
                                link={tool.link}
                                isExternal={tool.isExternal}
                                used={usedTools.includes(tool.id)}
                                index={index}
                            />
                        </div>
                    ))}
                </div>

                {/* Chat quick access - floating button */}
                <motion.div
                    className="fixed bottom-4 right-4 z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="gradient"
                        size="lg"
                        className="rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg"
                        onClick={() => {
                            router.push("/chat");
                            markToolAsUsed("chat-guide");
                        }}
                    >
                        <div className="relative">
                            <MessageCircle size={26} />
                            {unreadMessages > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadMessages}
                                </div>
                            )}
                        </div>
                    </Button>
                </motion.div>

                {/* Dashboard Widgets - 2x2 grid on desktop, single column on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Top Row */}
                    <WellnessGauge
                        score={wellnessScore}
                        previousScore={previousScore}
                    />
                    <MoodSelector
                        onMoodSelect={() => {
                            // Simulate score update when mood is selected
                            setWellnessScore((prevScore) => {
                                setPreviousScore(prevScore);
                                // Random small adjustment
                                return Math.min(
                                    100,
                                    Math.max(
                                        0,
                                        prevScore +
                                            Math.floor(Math.random() * 5) -
                                            2
                                    )
                                );
                            });
                        }}
                    />

                    {/* Bottom Row */}
                    <ProgressChart />
                    <DailyTip />
                </div>

                {/* Habit Tracker */}
                <div className="mb-8">
                    <HabitTracker />
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white text-center"
                >
                    <h3 className="text-xl font-bold mb-2 flex items-center justify-center">
                        <Sparkles className="mr-2" size={20} />
                        Continue Your Wellness Journey
                    </h3>
                    <p className="mb-4 max-w-lg mx-auto">
                        Complete the steps in your wellness journey to unlock
                        personalized recommendations and track your progress.
                    </p>
                    <Button
                        variant="glass"
                        className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
                        onClick={() =>
                            handleStepClick(journeySteps[currentStep].id)
                        }
                    >
                        Continue to{" "}
                        {journeySteps[currentStep]?.title || "Next Step"}
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
