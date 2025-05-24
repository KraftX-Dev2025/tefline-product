// src/components/home/mood-selector.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check } from "lucide-react";
import { getFromLocalStorage } from "@/lib/utils";
import { MOODS } from "@/constants/resources";

interface MoodSelectorProps {
    onMoodSelect?: (mood: { emoji: string; label: string }) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [showThanks, setShowThanks] = useState(false);

    // Load saved mood - must be in useEffect to avoid SSR localStorage issues
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                // Check if we selected a mood today
                const savedMood = getFromLocalStorage<{
                    index: number;
                    date: string;
                } | null>("dailyMood", null);
                const today = new Date().toISOString().split("T")[0];

                if (savedMood && savedMood.date === today) {
                    setSelectedMood(savedMood.index);
                }
            } catch (error) {
                console.error("Error loading mood data", error);
            }
        }
    }, []);

    const handleMoodSelect = (index: number) => {
        if (selectedMood === index) return;

        setSelectedMood(index);

        // Trigger callback if provided
        if (onMoodSelect) {
            onMoodSelect(MOODS[index]);
        }

        // Show thanks message
        setShowThanks(true);
        setTimeout(() => setShowThanks(false), 3000);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative overflow-hidden h-full">
            <h3 className="text-xl font-bold text-gray-700 mb-3 flex items-center">
                <Heart className="mr-2 text-pink-400" size={20} />
                How are you feeling today?
            </h3>

            <AnimatePresence mode="wait">
                {!showThanks ? (
                    <motion.div
                        key="mood-selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-between mt-4 space-x-1"
                    >
                        {MOODS.map((mood, index) => (
                            <motion.button
                                key={mood.label}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMoodSelect(index)}
                                className={`
                  relative flex flex-col items-center justify-center p-2 rounded-lg border transition-all
                  ${
                      selectedMood === index
                          ? `${mood.color} border-2`
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }
                `}
                            >
                                <span className="text-2xl mb-1">
                                    {mood.emoji}
                                </span>
                                <span className="text-xs font-medium">
                                    {mood.label}
                                </span>

                                {selectedMood === index && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
                                    >
                                        <Check
                                            size={10}
                                            className="text-green-500"
                                        />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="thanks-message"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center h-20"
                    >
                        <div className="text-center">
                            <div className="text-xl mb-1">
                                {selectedMood !== null &&
                                    MOODS[selectedMood].emoji}
                            </div>
                            <p className="text-teal-600 font-medium">
                                Thanks for sharing how you feel!
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                We'll adjust your recommendations.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-xs text-gray-400 mt-6 text-right italic">
                {selectedMood !== null
                    ? "Your mood has been saved"
                    : "Select the emoji that best matches your mood"}
            </div>
        </div>
    );
}
