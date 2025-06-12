import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
    progress: number;
    showPercentage?: boolean;
    height?: "sm" | "md" | "lg";
    animated?: boolean;
}

export default function ProgressBar({
    progress,
    showPercentage = false,
    height = "md",
    animated = true,
}: ProgressBarProps) {
    const heightClass = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
    };

    const progressVariants = {
        initial: { width: "0%" },
        animate: {
            width: `${progress}%`,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const countVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { delay: 0.3, duration: 0.5 },
        },
    };

    return (
        <div className="w-full">
            <div className="relative bg-secondary/30 rounded-full overflow-hidden">
                {animated ? (
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        initial="initial"
                        animate="animate"
                        variants={progressVariants}
                        style={{
                            height:
                                heightClass[height].replace("h-", "") + "rem",
                        }}
                    />
                ) : (
                    <Progress
                        value={progress}
                        className={heightClass[height]}
                        indicatorColor="bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                )}
            </div>

            {showPercentage && (
                <motion.div
                    className="mt-1 text-xs text-muted-foreground text-right"
                    initial="initial"
                    animate="animate"
                    variants={countVariants}
                >
                    {Math.round(progress)}% complete
                </motion.div>
            )}
        </div>
    );
}
