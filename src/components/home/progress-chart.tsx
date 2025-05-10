// src/components/home/progress-chart.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Helper interface for activity data
interface ActivityData {
    day: string;
    value: number;
    label: string;
}

interface ProgressChartProps {
    data?: ActivityData[];
}

export default function ProgressChart({ data }: ProgressChartProps) {
    // Default data if none provided
    const activityData = data || [
        { day: "Mon", value: 30, label: "30 min" },
        { day: "Tue", value: 45, label: "45 min" },
        { day: "Wed", value: 25, label: "25 min" },
        { day: "Thu", value: 60, label: "60 min" },
        { day: "Fri", value: 15, label: "15 min" },
        { day: "Sat", value: 40, label: "40 min" },
        { day: "Sun", value: 0, label: "0 min" },
    ];

    // Find max value for scaling
    const maxValue = Math.max(...activityData.map((d) => d.value));

    // Function to get today's day of week
    const getToday = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[new Date().getDay()];
    };

    const today = getToday();

    return (
        <Card className="h-full">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-700 flex items-center">
                        <Activity className="mr-2 text-teal-500" size={20} />
                        Weekly Activity
                    </h3>

                    <div className="text-xs font-medium text-teal-500 bg-teal-50 px-2 py-1 rounded-full">
                        Last 7 Days
                    </div>
                </div>

                <div className="h-36 flex items-end justify-between space-x-2">
                    {activityData.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                        >
                            <motion.div
                                className="w-full bg-gray-100 rounded-md relative group"
                                style={{
                                    height: `${Math.max(
                                        (item.value / maxValue) * 100,
                                        5
                                    )}%`,
                                }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "backOut",
                                }}
                            >
                                <motion.div
                                    className={`absolute inset-0 rounded-md ${
                                        item.day === today
                                            ? "bg-teal-400"
                                            : "bg-teal-200 group-hover:bg-teal-300"
                                    } transition-colors`}
                                />

                                {/* Tooltip on hover */}
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap">
                                    {item.label}
                                </div>
                            </motion.div>

                            <span
                                className={`text-xs mt-1 font-medium ${
                                    item.day === today
                                        ? "text-teal-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {item.day}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                    <span>Min: 0 min</span>
                    <span>Max: {maxValue} min</span>
                </div>
            </CardContent>
        </Card>
    );
}
