// src/components/home/wellness-gauge.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, TrendingUp, Award } from "lucide-react";

interface WellnessGaugeProps {
    score: number; // 0-100
    previousScore?: number;
}

export default function WellnessGauge({
    score,
    previousScore,
}: WellnessGaugeProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    // Animate score on load
    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedScore(score);
        }, 500);

        return () => clearTimeout(timeout);
    }, [score]);

    // Calculate angle based on score (0-100 -> 0-180 degrees)
    const angle = (animatedScore / 100) * 180;

    // Determine score color
    const getScoreColor = (score: number) => {
        if (score < 40) return "text-orange-500";
        if (score < 70) return "text-yellow-500";
        return "text-teal-500";
    };

    // Calculate score change
    const scoreChange = previousScore ? score - previousScore : 0;

    return (
        <div className="relative bg-white rounded-xl border border-gray-200 p-6 overflow-hidden shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-1 flex items-center">
                <HeartPulse className="mr-2 text-teal-500" size={20} />
                Wellness Score
            </h3>

            {scoreChange !== 0 && (
                <div
                    className={`text-sm font-medium mb-3 flex items-center ${
                        scoreChange > 0 ? "text-teal-500" : "text-orange-500"
                    }`}
                >
                    <TrendingUp
                        size={14}
                        className={`mr-1 ${
                            scoreChange < 0 ? "rotate-180" : ""
                        }`}
                    />
                    <span>
                        {scoreChange > 0 ? "+" : ""}
                        {scoreChange} points since last week
                    </span>
                </div>
            )}

            <div className="relative h-36 w-full flex items-center justify-center mt-2">
                {/* Background semi-circle */}
                <div className="absolute h-32 w-32 border-t-[15px] border-l-[15px] border-r-[15px] border-gray-100 rounded-full origin-bottom rotate-[-180deg]" />

                {/* Score indicator needle */}
                <motion.div
                    className="absolute h-32 w-1 bg-teal-500 rounded-full origin-bottom"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: angle - 90 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                />

                {/* Score display */}
                <div className="absolute -bottom-2 flex flex-col items-center">
                    <motion.div
                        className={`text-4xl font-bold ${getScoreColor(
                            animatedScore
                        )}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {Math.round(animatedScore)}
                    </motion.div>
                    <p className="text-sm text-gray-500">out of 100</p>
                </div>

                {/* Gauge decoration */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
                    <Award size={20} className="text-teal-400" />
                </div>

                {/* Gauge scale markers */}
                {[0, 45, 90, 135, 180].map((marker, index) => (
                    <div
                        key={index}
                        className="absolute h-32 w-0.5 bg-gray-200 origin-bottom"
                        style={{ transform: `rotate(${marker - 90}deg)` }}
                    />
                ))}
            </div>

            {/* Score categories */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Needs Work</span>
                <span>Good</span>
                <span>Excellent</span>
            </div>
        </div>
    );
}
