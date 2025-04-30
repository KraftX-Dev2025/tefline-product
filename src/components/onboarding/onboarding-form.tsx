import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProgressBar from "./progress-bar";
import {
    OnboardingQuestion,
    OnboardingResponse,
    UserProfile,
} from "@/lib/types";
import { saveToLocalStorage } from "@/lib/utils";

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
    }, [currentStep, question.id]);

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

    const variants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
    };

    return (
        <div className="max-w-xl mx-auto">
            <ProgressBar progress={progress} />

            <Card className="mt-8 bg-card/60 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {currentStep === totalSteps - 1
                            ? "Almost done!"
                            : "Tell us about yourself"}
                    </CardTitle>
                </CardHeader>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                    >
                        <CardContent>
                            <h3 className="text-lg font-medium mb-4">
                                {question.question}
                            </h3>

                            {question.type === "text" && (
                                <Input
                                    value={currentResponse as string}
                                    onChange={handleInputChange}
                                    placeholder={question.placeholder}
                                    className="bg-background/50"
                                />
                            )}

                            {question.type === "multiSelect" && (
                                <div className="space-y-2">
                                    {question.options?.map((option, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center space-x-3 p-3 rounded-md bg-secondary/30 border border-secondary/40 cursor-pointer hover:bg-secondary/40 transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                className="rounded border-secondary"
                                                checked={(
                                                    currentResponse as string[]
                                                ).includes(option)}
                                                onChange={() =>
                                                    handleCheckboxChange(option)
                                                }
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {question.type === "singleSelect" && (
                                <div className="space-y-2">
                                    {question.options?.map((option, index) => (
                                        <label
                                            key={index}
                                            className={`flex items-center space-x-3 p-3 rounded-md border cursor-pointer transition-colors ${
                                                currentResponse === option
                                                    ? "bg-primary/10 border-primary/50"
                                                    : "bg-secondary/30 border-secondary/40 hover:bg-secondary/40"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={question.id}
                                                className="text-primary"
                                                checked={
                                                    currentResponse === option
                                                }
                                                onChange={() =>
                                                    handleRadioChange(option)
                                                }
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </motion.div>
                </AnimatePresence>

                <CardFooter className="flex justify-between pt-4 border-t border-border">
                    <Button
                        variant="ghost"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="flex items-center"
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Back
                    </Button>

                    <Button
                        variant={
                            currentStep === totalSteps - 1
                                ? "gradient"
                                : "default"
                        }
                        onClick={handleNext}
                        disabled={!isValid() || loading}
                        className="flex items-center"
                    >
                        {loading ? (
                            "Saving..."
                        ) : currentStep === totalSteps - 1 ? (
                            <>
                                Complete{" "}
                                <CheckCircle2 size={16} className="ml-1" />
                            </>
                        ) : (
                            <>
                                Next <ChevronRight size={16} className="ml-1" />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-4">
                Step {currentStep + 1} of {totalSteps}
            </p>
        </div>
    );
}
