"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Brain, CheckCircle2 } from "lucide-react";
import LoginForm from "@/components/auth/login-form";

// Visual wellness illustration components
const WellnessVisual = () => {
    return (
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-teal-400/10 via-teal-500/10 to-teal-600/20 overflow-hidden">
            {/* Background gradient circles */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-teal-300/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/10 rounded-full filter blur-3xl"></div>

            {/* Floating wellness icons */}
            <div className="absolute inset-0">
                {[
                    {
                        icon: Heart,
                        size: 32,
                        x: "20%",
                        y: "30%",
                        color: "text-red-400/40",
                    },
                    {
                        icon: Brain,
                        size: 40,
                        x: "70%",
                        y: "40%",
                        color: "text-teal-500/30",
                    },
                    {
                        icon: Sparkles,
                        size: 36,
                        x: "40%",
                        y: "70%",
                        color: "text-amber-400/30",
                    },
                    {
                        icon: CheckCircle2,
                        size: 28,
                        x: "60%",
                        y: "20%",
                        color: "text-green-500/30",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            y: [0, -10, 0],
                            x: [0, 5, 0],
                        }}
                        transition={{
                            opacity: { duration: 0.5, delay: i * 0.2 },
                            y: {
                                repeat: Infinity,
                                duration: 3 + i,
                                repeatType: "mirror",
                                delay: i * 0.5,
                            },
                            x: {
                                repeat: Infinity,
                                duration: 4 + i,
                                repeatType: "mirror",
                                delay: i * 0.3,
                            },
                        }}
                        className={`absolute ${item.color}`}
                        style={{ left: item.x, top: item.y }}
                    >
                        <item.icon size={item.size} />
                    </motion.div>
                ))}

                {/* Central wellness visualization */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20">
                            <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 bg-teal-500/30 rounded-full flex items-center justify-center">
                                    <Heart size={32} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-white text-center mb-2">
                            Wellness Intelligence
                        </h2>
                        <p className="text-teal-100/80 text-center max-w-xs text-sm">
                            Your personalized journey to optimize health and
                            wellbeing through AI-powered guidance
                        </p>

                        {/* Key benefits */}
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            {[
                                "Evidence-based",
                                "Personalized",
                                "AI-powered",
                                "Community-driven",
                            ].map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center"
                                >
                                    <CheckCircle2
                                        size={16}
                                        className="text-teal-300 mr-2"
                                    />
                                    <span className="text-white text-sm">
                                        {benefit}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function LoginPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="min-h-screen flex items-stretch relative overflow-hidden bg-white">
            {/* Left side - Login form */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center bg-teal-50 px-3 py-1 rounded-full text-sm font-medium text-teal-600 mb-4">
                            <Sparkles size={14} className="mr-1" />
                            Secure Login
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome to Tefline
                        </h1>
                        <p className="text-gray-500">
                            Access your wellness intelligence dashboard
                        </p>
                    </motion.div>

                    <LoginForm />
                </div>
            </div>

            {/* Right side - Visual illustration */}
            {isMounted && <WellnessVisual />}
        </div>
    );
}
