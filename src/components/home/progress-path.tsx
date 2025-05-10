// src/components/home/progress-path.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Lock } from "lucide-react";

interface ProgressPathProps {
    steps: {
        id: string;
        title: string;
        completed: boolean;
        locked?: boolean;
    }[];
    currentStepIndex: number;
    onStepClick: (id: string) => void;
}

export default function ProgressPath({
    steps,
    currentStepIndex,
    onStepClick,
}: ProgressPathProps) {
    return (
        <div className="relative w-full px-4 py-6 overflow-x-auto">
            {/* Background pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-1/2 left-0 w-full h-4 bg-teal-100 rounded-full" />
            </div>

            <div className="relative flex items-center justify-start min-w-max">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        {/* Connection line between steps */}
                        {index > 0 && (
                            <div
                                className={`w-12 h-1 mx-1 sm:w-20 sm:mx-2 ${
                                    index <= currentStepIndex
                                        ? "bg-teal-400"
                                        : "bg-gray-200"
                                }`}
                            />
                        )}

                        {/* Step stone */}
                        <motion.div
                            whileHover={
                                !step.locked ? { scale: 1.1, y: -5 } : {}
                            }
                            onClick={() => !step.locked && onStepClick(step.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className={`relative flex flex-col items-center cursor-pointer ${
                                step.locked
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            }`}
                        >
                            <div
                                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
                  shadow-md border-2 transform transition-all duration-300
                  ${
                      step.completed
                          ? "bg-teal-400 border-teal-500 text-white"
                          : index === currentStepIndex
                          ? "bg-white border-teal-400 text-teal-500"
                          : "bg-white border-gray-300 text-gray-400"
                  }
                `}
                            >
                                {step.locked ? (
                                    <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                                ) : step.completed ? (
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                ) : index === currentStepIndex ? (
                                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                                ) : (
                                    <span className="text-lg sm:text-xl font-bold">
                                        {index + 1}
                                    </span>
                                )}

                                {/* Active indicator pulse */}
                                {index === currentStepIndex &&
                                    !step.completed && (
                                        <motion.div
                                            initial={{
                                                opacity: 0.5,
                                                scale: 0.8,
                                            }}
                                            animate={{ opacity: 0, scale: 1.5 }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                repeatType: "loop",
                                            }}
                                            className="absolute w-full h-full rounded-full bg-teal-300"
                                        />
                                    )}
                            </div>

                            <div className="mt-2 text-center">
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                    {step.title}
                                </p>
                            </div>
                        </motion.div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
