"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Sparkles,
    CheckCircle2,
    Calendar,
    AlertCircle,
    MessageSquare,
    Sun,
    TrendingUp,
    Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

// Simplified dashboard components
const WelcomeCard = ({ name = "User" }) => {
    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="gradient-bg rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        {getTimeBasedGreeting()}, {name}
                    </h1>
                    <p className="text-teal-100 mt-1">
                        Let's continue your wellness journey
                    </p>

                    <div className="mt-4 flex space-x-3">
                        <Button
                            size="sm"
                            variant="glass"
                            className="bg-white/20 hover:bg-white/30 text-white border-0"
                        >
                            Track Progress
                        </Button>
                        <Button
                            size="sm"
                            variant="glass"
                            className="bg-white/10 hover:bg-white/20 text-white border-0"
                        >
                            Daily Tips
                        </Button>
                    </div>
                </div>

                <div className="w-16 h-16  rounded-full flex items-center justify-center">
                    <Sun size={28} className="text-white" />
                </div>
            </div>

            {/* Streak indicator */}
            <div className="mt-6 pt-4 border-t border-teal-400/30 flex items-center">
                <div className="flex mr-3">
                    {[1, 2, 3, 4, 5].map((day) => (
                        <div
                            key={day}
                            className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${day <= 3
                                ? "bg-white text-teal-600"
                                : "bg-teal-400/30 text-teal-100"
                                }`}
                        >
                            {day <= 3 && <CheckCircle2 size={14} />}
                        </div>
                    ))}
                </div>
                <div className="text-sm">
                    <p className="font-medium">3-day streak!</p>
                    <p className="text-teal-100 text-xs">
                        Come back tomorrow to keep it going
                    </p>
                </div>
            </div>
        </div>
    );
};

// Define the types for the QuickAccessCard props
interface QuickAccessCardProps {
    title: string;
    icon: React.ElementType; // For Lucide icons or any component that can be rendered
    value: string;
    color: string;
    href?: string; // Optional since you're using onClick
    onClick: () => void;
}

const QuickAccessCard = ({
    title,
    icon: Icon,
    value,
    color,
    href,
    onClick,
}: QuickAccessCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer`}
            onClick={onClick}
        >
            <div
                className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-3`}
            >
                <Icon size={24} className="text-white" />
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium">
                        {title}
                    </h3>
                    <p className="text-xl font-bold text-gray-800">{value}</p>
                </div>

                <ArrowUpRight size={18} className="text-gray-400" />
            </div>
        </motion.div>
    );
};
const DailyGoalCard = () => {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium flex items-center text-gray-800">
                    <Calendar size={16} className="text-teal-500 mr-2" />
                    Today's Goals
                </h3>
                <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full font-medium">
                    2/4 Completed
                </span>
            </div>

            <div className="space-y-3">
                {[
                    { task: "Morning meditation", complete: true },
                    { task: "Drink 2L of water", complete: true },
                    { task: "30 min exercise", complete: false },
                    { task: "Read for 15 minutes", complete: false },
                ].map((item, i) => (
                    <div
                        key={i}
                        className={`flex items-center p-3 rounded-lg ${item.complete
                            ? "bg-teal-50 text-teal-600"
                            : "bg-gray-50 text-gray-600"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${item.complete
                                ? "bg-teal-400 text-white"
                                : "bg-white border border-gray-300"
                                }`}
                        >
                            {item.complete && <CheckCircle2 size={12} />}
                        </div>
                        <span className={item.complete ? "line-through" : ""}>
                            {item.task}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WellnessScoreCard = () => {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium flex items-center text-gray-800">
                    <Heart size={16} className="text-red-400 mr-2" />
                    Wellness Score
                </h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    +12 pts
                </span>
            </div>

            <div className="flex justify-center my-4">
                <div className="relative">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="12"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="12"
                            strokeDasharray="339.29"
                            strokeDashoffset="84.82" // 25% of circumference
                            transform="rotate(-90 60 60)"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-gray-800">
                            76
                        </span>
                        <span className="text-xs text-gray-500">
                            out of 100
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
                {[
                    { label: "Sleep", value: 82, color: "bg-blue-100" },
                    { label: "Nutrition", value: 65, color: "bg-green-100" },
                    { label: "Activity", value: 73, color: "bg-orange-100" },
                    { label: "Mindfulness", value: 91, color: "bg-purple-100" },
                ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-2 rounded-lg">
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                            <span>{item.label}</span>
                            <span className="font-medium">
                                {item.value}/100
                            </span>
                        </div>
                        <div className={`h-1.5 rounded-full ${item.color}`}>
                            <div
                                className="h-full bg-teal-500 rounded-full"
                                style={{ width: `${item.value}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReminderCard = () => {
    return (
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 shadow-sm">
            <div className="flex">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <AlertCircle size={20} className="text-amber-500" />
                </div>

                <div>
                    <h3 className="font-medium text-amber-700">Reminder</h3>
                    <p className="text-amber-600 text-sm mt-1">
                        You have a meditation session scheduled for today at
                        5:00 PM
                    </p>

                    <div className="mt-3 flex space-x-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-200 text-amber-700 hover:bg-amber-100 bg-amber-50"
                        >
                            Reschedule
                        </Button>
                        <Button
                            size="sm"
                            className="bg-amber-200 hover:bg-amber-300 text-amber-800"
                        >
                            Mark Complete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecentActivityCard = () => {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-medium flex items-center text-gray-800 mb-4">
                <Sparkles size={16} className="text-teal-500 mr-2" />
                Recent Activity
            </h3>

            <div className="space-y-4 relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 z-0"></div>

                {[
                    {
                        time: "Today, 10:30 AM",
                        action: "Completed 20 min meditation",
                        icon: CheckCircle2,
                        color: "bg-green-100 text-green-600",
                    },
                    {
                        time: "Yesterday",
                        action: "Updated nutrition goals",
                        icon: Heart,
                        color: "bg-purple-100 text-purple-600",
                    },
                    {
                        time: "2 days ago",
                        action: "Used AI Sleep Assistant",
                        icon: MessageSquare,
                        color: "bg-blue-100 text-blue-600",
                    },
                ].map((item, i) => (
                    <div key={i} className="flex relative z-10">
                        <div
                            className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center mr-4`}
                        >
                            <item.icon size={16} />
                        </div>

                        <div>
                            <p className="text-gray-800 text-sm">
                                {item.action}
                            </p>
                            <p className="text-gray-400 text-xs">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                className="w-full mt-4 text-teal-600 hover:text-teal-700"
                size="sm"
            >
                View All Activity
            </Button>
        </div>
    );
};

export default function Dashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState("User");
    const [isLoading, setIsLoading] = useState(true);

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

            // Get user name from metadata if available
            if (session.user?.user_metadata?.full_name) {
                setUserName(session.user.user_metadata.full_name.split(" ")[0]);
            }

            setIsLoading(false);
        };

        checkSession();
    }, [router]);

    const handleCardClick = (destination: string) => {
        router.push(destination);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-500 font-semibold">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Welcome card */}
            <WelcomeCard name={userName} />

            {/* Quick access cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <QuickAccessCard
                    title="Resources"
                    icon={Sparkles}
                    value="12 Guides"
                    color="bg-teal-500"
                    href="/resources"
                    onClick={() => handleCardClick("/resources")}
                />
                <QuickAccessCard
                    title="AI Tools"
                    icon={MessageSquare}
                    value="2 Tools"
                    color="bg-indigo-500"
                    href="/ai-tools"
                    onClick={() => handleCardClick("/ai-tools")}
                />
                <QuickAccessCard
                    title="Habits"
                    icon={CheckCircle2}
                    value="4 Active"
                    color="bg-amber-500"
                    href="/habits"
                    onClick={() => handleCardClick("/habits")}
                />
                <QuickAccessCard
                    title="Progress"
                    icon={TrendingUp}
                    value="View Stats"
                    color="bg-emerald-500"
                    href="/progress"
                    onClick={() => handleCardClick("/progress")}
                />
            </div>

            {/* Reminder card */}
            <div className="mt-6">
                <ReminderCard />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-6">
                    <DailyGoalCard />
                    <RecentActivityCard />
                </div>

                <div className="space-y-6">
                    <WellnessScoreCard />

                    {/* Quick chat access */}
                    <div className="gradient-bg rounded-xl p-5 text-white shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium flex items-center">
                                    <MessageSquare size={18} className="mr-2" />
                                    AI Assistant
                                </h3>
                                <p className="text-blue-100 text-sm mt-1 mb-3">
                                    Get personalized guidance from your wellness
                                    assistant
                                </p>

                                <Button
                                    size="sm"
                                    className="bg-white/20 hover:bg-white/30 text-white"
                                    onClick={() => handleCardClick("/chat")}
                                >
                                    Start Conversation
                                </Button>
                            </div>

                            <div className="bg-white/10 p-3 rounded-lg">
                                <MessageSquare
                                    size={24}
                                    className="text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
