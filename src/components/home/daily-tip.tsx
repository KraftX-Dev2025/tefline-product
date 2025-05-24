// src/components/home/daily-tip.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WELLNESS_TIPS } from "@/constants/resources";

interface DailyTipProps {
    onNewTip?: () => void;
}

export default function DailyTip({ onNewTip }: DailyTipProps) {
    const [currentTip, setCurrentTip] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    // Get a new random tip
    const getNewTip = () => {
        setIsChanging(true);
        setTimeout(() => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * WELLNESS_TIPS.length);
            } while (newIndex === currentTip);

            setCurrentTip(newIndex);
            setIsChanging(false);
            if (onNewTip) onNewTip();
        }, 300);
    };

    // Set initial random tip
    useEffect(() => {
        setCurrentTip(Math.floor(Math.random() * WELLNESS_TIPS.length));
    }, []);

    const tipVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-700 flex items-center">
                    <Lightbulb className="mr-2 text-yellow-400" size={20} />
                    Daily Wellness Tip
                </h3>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-teal-500"
                    onClick={getNewTip}
                    disabled={isChanging}
                >
                    <RefreshCw
                        size={15}
                        className={isChanging ? "animate-spin" : ""}
                    />
                </Button>
            </div>

            <div className="h-20 relative">
                <motion.div
                    key={currentTip}
                    variants={tipVariants}
                    initial="hidden"
                    animate={isChanging ? "exit" : "visible"}
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-500 uppercase">
                            {WELLNESS_TIPS[currentTip]?.category || "wellness"}
                        </span>
                    </div>
                    <p className="text-gray-600">
                        {WELLNESS_TIPS[currentTip]?.text ||
                            "Loading your daily wellness tip..."}
                    </p>
                </motion.div>
            </div>

            <div className="text-xs text-gray-400 mt-4 text-right italic">
                Updated daily • Tap refresh for a new tip
            </div>
        </div>
    );
}
