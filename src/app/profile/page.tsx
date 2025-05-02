"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const supabase = createClient();
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

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
        const getUserData = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (user) {
                const name =
                    user.user_metadata?.name ||
                    user.user_metadata?.full_name ||
                    null;
                setUserName(name);
            } else {
                console.error("No user found:", error);
            }
        };

        getUserData();
    }, []);

    async function handleLogout(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault();
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
            return;
        }
        router.push('/login');
    }

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-teal-300 bg-teal-50 flex items-center justify-center text-teal-500 text-4xl font-bold">
                        {userName ? userName.charAt(0).toUpperCase() : "?"}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {userName || "Loading..."}
                        </h1>

                        <p className="text-gray-500">
                            Wellness Journey: 3 months
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-teal-50 rounded-full text-xs text-teal-600">
                                Lifestyle Medicine
                            </span>
                            <span className="px-3 py-1 bg-teal-50 rounded-full text-xs text-teal-600">
                                Stress Management
                            </span>
                            <span className="px-3 py-1 bg-teal-50 rounded-full text-xs text-teal-600">
                                Sleep Improvement
                            </span>
                        </div>
                    </div>

                    <Button className="bg-teal-300 hover:bg-teal-400 text-white" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>

                {/* Wellness Summary */}
                <Card className="bg-white border-gray-200 p-6 mb-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Wellness Summary
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-2">
                                Weekly Goal Progress
                            </p>
                            <div className="flex items-center gap-3">
                                <Progress
                                    value={65}
                                    className="h-2 bg-gray-100"
                                />
                                <span className="text-sm font-medium">65%</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">
                                Resources Explored
                            </p>
                            <div className="flex items-center gap-3">
                                <Progress
                                    value={40}
                                    className="h-2 bg-gray-100"
                                />
                                <span className="text-sm font-medium">40%</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">
                                Wellness Score
                            </p>
                            <div className="flex items-center gap-3">
                                <Progress
                                    value={78}
                                    className="h-2 bg-gray-100"
                                />
                                <span className="text-sm font-medium">78</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Tabs Content */}
                <Tabs defaultValue="journey" className="space-y-4">
                    <TabsList className="bg-white border border-gray-200">
                        <TabsTrigger
                            value="journey"
                            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600"
                        >
                            Wellness Journey
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="journey" className="space-y-4">
                        <Card className="bg-white border-gray-200 p-6 shadow-sm">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                Your Journey
                            </h3>

                            <div className="space-y-6">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="relative pl-6 border-l border-gray-200"
                                    >
                                        <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-teal-300"></div>
                                        <div className="mb-1 text-sm text-gray-400">
                                            3 days ago
                                        </div>
                                        <h4 className="text-base font-medium text-gray-800">
                                            Completed Sleep Assessment
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            You identified areas for improvement
                                            in your sleep routine.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </TabsContent>

                    {/* <TabsContent value="resources" className="space-y-4">
                        <Card className="bg-slate-900 border-slate-800 p-6">
                            <h3 className="text-lg font-medium text-cyan-300 mb-4">
                                Saved Resources
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Card
                                        key={item}
                                        className="bg-slate-800 border-slate-700 overflow-hidden"
                                    >
                                        <div className="relative h-32 w-full bg-slate-700">
                                            <Image
                                                src="/api/placeholder/300/150"
                                                alt="Resource thumbnail"
                                                fill
                                                className="object-cover opacity-80"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-base font-medium text-slate-200 mb-1">
                                                Nutrition Guide:
                                                Anti-inflammatory Foods
                                            </h4>
                                            <p className="text-xs text-slate-400 mb-3">
                                                Saved 2 weeks ago
                                            </p>
                                            <Link
                                                href="#"
                                                className="text-sm text-cyan-400 hover:text-cyan-300"
                                            >
                                                View Resource →
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="tools" className="space-y-4">
                        <Card className="bg-slate-900 border-slate-800 p-6">
                            <h3 className="text-lg font-medium text-cyan-300 mb-4">
                                AI Tool Sessions
                            </h3>

                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <Card
                                        key={item}
                                        className="bg-slate-800 border-slate-700 p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-md bg-cyan-900/30 text-cyan-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"></path>
                                                    <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="text-base font-medium text-slate-200">
                                                        {item === 1
                                                            ? "Cognitive Counselor"
                                                            : "Lifestyle Digital"}
                                                    </h4>
                                                    <span className="text-xs text-slate-400">
                                                        May 1, 2025
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mt-1">
                                                    {item === 1
                                                        ? "Session focused on identifying cognitive distortions in work-related stress."
                                                        : "Explored personalized nutrition recommendations for energy levels."}
                                                </p>
                                                <Link
                                                    href="#"
                                                    className="text-sm text-cyan-400 hover:text-cyan-300 block mt-2"
                                                >
                                                    Continue Conversation →
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    </TabsContent> */}
                </Tabs>
            </div>
        </div>
    );
}