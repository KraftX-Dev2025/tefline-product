"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    OnboardingQuestion,
    OnboardingResponse,
    UserProfile,
} from "@/lib/types";
import { saveToLocalStorage } from "@/lib/utils";

// Define a type for the ICONS object
type IconsType = {
    [key: string]: string;
};

// Visual icons for the onboarding options
const ICONS: IconsType = {
    "Improve sleep quality": "😴",
    "Reduce stress": "😌",
    "Eat healthier": "🥗",
    "Exercise regularly": "🏃‍♂️",
    "Enhance mental wellbeing": "🧠",
    "Better work-life balance": "⚖️",
    "Weight management": "📊",
    Nutrition: "🍎",
    Fitness: "💪",
    "Mental health": "🧘‍♀️",
    Sleep: "🌙",
    Meditation: "✨",
    "Stress management": "🌿",
    "Lifestyle medicine": "💊",
};

const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
    {
        id: "name",
        question: "What should we call you?",
        type: "text",
        placeholder: "Enter your name",
    },
    {
        id: "goals",
        question: "What are your wellness goals?",
        type: "multiSelect",
        options: [
            "Improve sleep quality",
            "Reduce stress",
            "Eat healthier",
            "Exercise regularly",
            "Enhance mental wellbeing",
            "Better work-life balance",
            "Weight management",
        ],
    },
    {
        id: "interests",
        question: "Which wellness areas are you most interested in?",
        type: "multiSelect",
        options: [
            "Nutrition",
            "Fitness",
            "Mental health",
            "Sleep",
            "Meditation",
            "Stress management",
            "Lifestyle medicine",
        ],
    },
    {
        id: "experience",
        question: "How would you describe your wellness journey?",
        type: "singleSelect",
        options: [
            "Just getting started (beginner)",
            "Some experience (intermediate)",
            "Very experienced (advanced)",
        ],
    },
];

export default function OnboardingForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<OnboardingResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentResponse, setCurrentResponse] = useState<string | string[]>(
        ""
    );

    const totalSteps = ONBOARDING_QUESTIONS.length;
    const question = ONBOARDING_QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / (totalSteps + 1)) * 100;

    useEffect(() => {
        // Find existing response for current question
        const existingResponse = responses.find(
            (r) => r.questionId === question.id
        );
        if (existingResponse) {
            setCurrentResponse(existingResponse.answer);
        } else {
            setCurrentResponse(question.type === "multiSelect" ? [] : "");
        }
    }, [currentStep, question.id, question.type, responses]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentResponse(e.target.value);
    };

    const handleCheckboxChange = (option: string) => {
        setCurrentResponse((prev) => {
            const prevArray = prev as string[];
            if (prevArray.includes(option)) {
                return prevArray.filter((item) => item !== option);
            } else {
                return [...prevArray, option];
            }
        });
    };

    const handleRadioChange = (option: string) => {
        setCurrentResponse(option);
    };

    const saveCurrentResponse = () => {
        const newResponses = [...responses];
        const existingIndex = responses.findIndex(
            (r) => r.questionId === question.id
        );

        const responseItem: OnboardingResponse = {
            questionId: question.id,
            answer: currentResponse,
        };

        if (existingIndex >= 0) {
            newResponses[existingIndex] = responseItem;
        } else {
            newResponses.push(responseItem);
        }

        setResponses(newResponses);
        return newResponses;
    };

    const handleNext = () => {
        const newResponses = saveCurrentResponse();

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeOnboarding(newResponses);
        }
    };

    const handlePrevious = () => {
        saveCurrentResponse();
        setCurrentStep(currentStep - 1);
    };

    const completeOnboarding = (finalResponses: OnboardingResponse[]) => {
        setLoading(true);

        // Convert responses to user profile format
        const nameResponse = finalResponses.find(
            (r) => r.questionId === "name"
        );
        const goalsResponse = finalResponses.find(
            (r) => r.questionId === "goals"
        );
        const interestsResponse = finalResponses.find(
            (r) => r.questionId === "interests"
        );
        const experienceResponse = finalResponses.find(
            (r) => r.questionId === "experience"
        );

        const experienceValue = experienceResponse?.answer as string;
        let experienceLevel: "beginner" | "intermediate" | "advanced" =
            "beginner";

        if (experienceValue?.includes("intermediate")) {
            experienceLevel = "intermediate";
        } else if (experienceValue?.includes("advanced")) {
            experienceLevel = "advanced";
        }

        const userProfile: UserProfile = {
            name: (nameResponse?.answer as string) || "",
            goals: (goalsResponse?.answer as string[]) || [],
            interests: (interestsResponse?.answer as string[]) || [],
            experience: experienceLevel,
            completedSetup: true,
        };

        // Save to localStorage
        saveToLocalStorage("userProfile", userProfile);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Redirect to dashboard
            router.push("/");
        }, 1000);
    };

    const isValid = () => {
        if (question.type === "text") {
            return (
                typeof currentResponse === "string" &&
                currentResponse.trim() !== ""
            );
        } else if (question.type === "multiSelect") {
            return Array.isArray(currentResponse) && currentResponse.length > 0;
        } else if (question.type === "singleSelect") {
            return (
                typeof currentResponse === "string" && currentResponse !== ""
            );
        }
        return false;
    };

    return (
        <div className="max-w-xl mx-auto">
            {/* Progress indicator - now dots instead of a bar */}
            <div className="flex justify-center mb-6">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full transition-all ${
                            index === currentStep
                                ? "bg-teal-500 scale-125"
                                : index < currentStep
                                ? "bg-teal-300"
                                : "bg-gray-200"
                        }`}
                    />
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
                {/* Visual background elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-300 to-teal-500" />
                <div className="absolute right-0 bottom-0 w-40 h-40 bg-teal-50 rounded-full -mr-20 -mb-20 z-0" />

                <div className="p-6 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={question.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Question */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {question.question}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {currentStep === 0
                                        ? "Let's personalize your wellness journey"
                                        : currentStep === totalSteps - 1
                                        ? "Almost done!"
                                        : `Step ${
                                              currentStep + 1
                                          } of ${totalSteps}`}
                                </p>
                            </div>

                            {/* Text input */}
                            {question.type === "text" && (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl">👋</span>
                                    </div>
                                    <input
                                        value={currentResponse as string}
                                        onChange={handleInputChange}
                                        placeholder={question.placeholder}
                                        className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:ring focus:ring-teal-100 outline-none text-center text-lg"
                                    />
                                </div>
                            )}

                            {/* Multi-select options with icons */}
                            {question.type === "multiSelect" && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {question.options?.map((option, index) => {
                                        const isSelected = (
                                            currentResponse as string[]
                                        ).includes(option);
                                        const icon = ICONS[option] || "✓";

                                        return (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={`relative cursor-pointer p-4 rounded-xl transition-all ${
                                                    isSelected
                                                        ? "bg-teal-100 border-2 border-teal-400 shadow-sm"
                                                        : "bg-white border-2 border-gray-100 hover:border-teal-200"
                                                }`}
                                                onClick={() =>
                                                    handleCheckboxChange(option)
                                                }
                                            >
                                                {/* Selection indicator */}
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 bg-teal-400 text-white w-5 h-5 rounded-full flex items-center justify-center">
                                                        <CheckCircle2
                                                            size={12}
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex flex-col items-center text-center">
                                                    <span className="text-2xl mb-2">
                                                        {icon}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {option}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Single-select options */}
                            {question.type === "singleSelect" && (
                                <div className="space-y-3">
                                    {question.options?.map((option, index) => {
                                        const isSelected =
                                            currentResponse === option;

                                        return (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`relative cursor-pointer p-4 rounded-xl flex items-center transition-all ${
                                                    isSelected
                                                        ? "bg-teal-100 border-2 border-teal-400 shadow-sm"
                                                        : "bg-white border-2 border-gray-100 hover:border-teal-200"
                                                }`}
                                                onClick={() =>
                                                    handleRadioChange(option)
                                                }
                                            >
                                                <div
                                                    className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border-2 ${
                                                        isSelected
                                                            ? "border-teal-500 bg-teal-500"
                                                            : "border-gray-300"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                    )}
                                                </div>
                                                <span className="text-gray-800">
                                                    {option}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                        {currentStep > 0 ? (
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                className="flex items-center"
                            >
                                <ChevronLeft size={16} className="mr-1" />
                                Back
                            </Button>
                        ) : (
                            <div></div> // Empty div to maintain flex spacing
                        )}

                        <Button
                            variant={
                                currentStep === totalSteps - 1
                                    ? "gradient"
                                    : "default"
                            }
                            onClick={handleNext}
                            disabled={!isValid() || loading}
                            className="flex items-center px-6"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Processing...
                                </>
                            ) : currentStep === totalSteps - 1 ? (
                                <>
                                    Complete{" "}
                                    <CheckCircle2 size={16} className="ml-2" />
                                </>
                            ) : (
                                <>
                                    Continue{" "}
                                    <ChevronRight size={16} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
