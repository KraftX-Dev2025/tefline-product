"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import RegisterForm from "@/components/auth/register-form";
import {
    Heart,
    Brain,
    Sparkles,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";

// Feature blocks component - simpler design
const FeatureBlocks = () => {
    const features = [
        {
            icon: <Brain className="h-5 w-5 text-teal-400" />,
            title: "AI-Powered Wellness",
        },
        {
            icon: <Heart className="h-5 w-5 text-teal-400" />,
            title: "Evidence-Based Health",
        },
        {
            icon: <Sparkles className="h-5 w-5 text-teal-400" />,
            title: "Personalized Journey",
        },
        {
            icon: <CheckCircle2 className="h-5 w-5 text-teal-400" />,
            title: "Community Support",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-teal-200/20 flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                >
                    <div className="bg-white/10 p-1.5 rounded-md mr-2">
                        {feature.icon}
                    </div>
                    <p className="text-white text-sm font-medium">
                        {feature.title}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default function RegisterPage() {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure animations only run after component has mounted (client-side)
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top section with gradient background */}
            <div className="pt-24 pb-12 px-4 md:px-8 bg-gradient-to-b from-teal-600 to-teal-700 text-white">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={isMounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Create Your Account
                        </h1>
                        <p className="text-teal-100 max-w-xl mx-auto">
                            Join the wellness intelligence revolution and begin
                            your journey to optimized health
                        </p>
                    </motion.div>

                    {/* Feature blocks - subtle animation */}
                    {isMounted && <FeatureBlocks />}
                </div>
            </div>

            {/* Form section */}
            <div className="flex-grow py-12 px-4 md:px-8 bg-gradient-to-b from-teal-50 via-white to-teal-50">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto">
                        {/* Metrics row - subtle animation */}
                        {isMounted && (
                            <div className="mb-8">
                                <motion.div
                                    className="grid grid-cols-3 gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {[
                                        {
                                            value: "87%",
                                            label: "Energy Improvement",
                                        },
                                        {
                                            value: "3.2yr",
                                            label: "Bio-Age Reduction",
                                        },
                                        {
                                            value: "92%",
                                            label: "Member Retention",
                                        },
                                    ].map((stat, i) => (
                                        <div
                                            key={i}
                                            className="bg-teal-50 border border-teal-100 rounded-lg p-3 text-center"
                                        >
                                            <p className="text-xl font-bold text-teal-600">
                                                {stat.value}
                                            </p>
                                            <p className="text-xs text-teal-700">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        )}

                        {/* Form component */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <RegisterForm />
                        </Suspense>

                        {/* Bottom helper text */}
                        {isMounted && (
                            <motion.div
                                className="mt-8 text-center text-sm text-teal-600 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span>Already have an account?</span>
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    className="inline-flex items-center ml-2 font-medium"
                                >
                                    <a
                                        href="/login"
                                        className="hover:underline"
                                    >
                                        Sign in
                                    </a>
                                    <ChevronRight className="h-4 w-4 ml-0.5" />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
