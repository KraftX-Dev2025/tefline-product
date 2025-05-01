"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Brain, Zap, Heart, Sparkles } from "lucide-react";
import LoginForm from "@/components/auth/login-form";

// Animated wellness illustrations component
const WellnessIllustrations = () => {
    return (
        <div className="absolute right-0 inset-y-0 w-full lg:w-1/2 hidden lg:block">
            {/* Gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-teal-700/20 to-teal-900/30" />

            {/* Animated illustrations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating wellness icons */}
                {[
                    {
                        icon: (
                            <Brain className="w-full h-full text-teal-500/30" />
                        ),
                        size: 80,
                        x: 200,
                        y: 100,
                    },
                    {
                        icon: (
                            <Zap className="w-full h-full text-amber-500/30" />
                        ),
                        size: 60,
                        x: 600,
                        y: 300,
                    },
                    {
                        icon: (
                            <Heart className="w-full h-full text-teal-400/20" />
                        ),
                        size: 70,
                        x: 400,
                        y: 500,
                    },
                    {
                        icon: (
                            <Sparkles className="w-full h-full text-cyan-400/20" />
                        ),
                        size: 50,
                        x: 700,
                        y: 200,
                    },
                    {
                        icon: (
                            <BrainCircuit className="w-full h-full text-teal-500/20" />
                        ),
                        size: 90,
                        x: 800,
                        y: 400,
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute rounded-full flex items-center justify-center"
                        style={{
                            width: item.size,
                            height: item.size,
                            left: item.x - item.size / 2,
                            top: item.y - item.size / 2,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, item.size % 20 === 0 ? 10 : -10, 0],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 5 + index * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}

                {/* Animated wellness quotations */}
                {[
                    { text: "Evidence-informed wellness", x: 300, y: 200 },
                    { text: "Optimize your healthspan", x: 500, y: 400 },
                    { text: "AI-driven personalization", x: 700, y: 300 },
                    { text: "Community accountability", x: 400, y: 500 },
                ].map((quote, index) => (
                    <motion.div
                        key={index}
                        className="absolute bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/20"
                        style={{
                            left: quote.x,
                            top: quote.y,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [20, 0, -20],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: index * 2,
                        }}
                    >
                        {quote.text}
                    </motion.div>
                ))}

                {/* Connected lines */}
                <svg
                    className="absolute inset-0 w-full h-full stroke-teal-400/20"
                    viewBox="0 0 1000 800"
                    style={{ overflow: "visible" }}
                >
                    <motion.path
                        d="M 200 100 Q 400 50, 600 300 T 800 400"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                        d="M 400 500 Q 500 300, 700 200 T 700 300"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.path
                        d="M 300 200 Q 400 350, 400 500"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                    />
                </svg>

                {/* Pulse circles */}
                {[
                    { x: 300, y: 200, delay: 1 },
                    { x: 600, y: 300, delay: 3 },
                    { x: 400, y: 500, delay: 5 },
                    { x: 700, y: 200, delay: 7 },
                ].map((point, index) => (
                    <motion.div
                        key={index}
                        className="absolute rounded-full bg-teal-400/10"
                        style={{
                            left: point.x,
                            top: point.y,
                            width: 10,
                            height: 10,
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: [0, 15],
                            opacity: [0.8, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 2,
                            delay: point.delay,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Success Radar
const SuccessRadar = () => {
    return (
        <div className="absolute bottom-0 right-0 hidden lg:block">
            <motion.div
                className="relative w-64 h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {[1, 2, 3, 4].map((ring) => (
                    <motion.div
                        key={ring}
                        className="absolute rounded-full border border-teal-500/20"
                        style={{
                            width: `${ring * 25}%`,
                            height: `${ring * 25}%`,
                            top: `${(4 - ring) * 12.5}%`,
                            left: `${(4 - ring) * 12.5}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.7 + ring * 0.2,
                            duration: 1,
                            ease: "easeOut",
                        }}
                    />
                ))}
                {[0, 45, 90, 135].map((angle, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-full h-0.5 bg-teal-500/10 origin-left"
                        style={{ transform: `rotate(${angle}deg)` }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            delay: 1.5 + i * 0.1,
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                    />
                ))}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-teal-400"
                    style={{ marginTop: -4, marginLeft: -4 }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-teal-400/30"
                    style={{ marginTop: -12, marginLeft: -12 }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute w-0.5 h-16 bg-teal-500/30 origin-bottom"
                    style={{ bottom: "50%", left: "50%", marginLeft: -1 }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <motion.div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-teal-500" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default function LoginPage() {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure that animations only run after component has mounted (client-side)
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="min-h-screen flex items-stretch relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50">
            {/* Abstract diagonal shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full bg-teal-300/10 blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sky-300/10 blur-[100px]" />
                <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-amber-300/10 blur-[80px]" />
            </div>

            {/* Left side - Login form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12 lg:p-8 relative z-10">
                <div className="max-w-md w-full">
                    {isMounted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center lg:text-left mb-8"
                        >
                            <div className="inline-flex items-center bg-teal-100/50 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-teal-700 mb-4">
                                <Sparkles className="w-4 h-4 mr-2" />
                                <span>Secure Login</span>
                            </div>
                            <h1 className="text-3xl font-bold text-teal-700 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                                Welcome to Tefline
                            </h1>
                            <p className="text-slate-600 mt-2 max-w-sm">
                                Access your wellness intelligence dashboard and
                                continue your journey to optimized health
                            </p>
                        </motion.div>
                    )}

                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>

            {/* Right side - Decorative wellness illustrations */}
            {isMounted && <WellnessIllustrations />}

            {/* Radar in bottom corner */}
            {isMounted && <SuccessRadar />}
        </div>
    );
}
