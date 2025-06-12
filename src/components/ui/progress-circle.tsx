"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressCircleProps {
    value: number; // 0-100
    size?: number; // Size in pixels
    strokeWidth?: number; // Width of the progress ring
    bgColor?: string; // Background circle color
    fillColor?: string; // Progress fill color
    textColor?: string; // Text color
    showValue?: boolean; // Whether to show the percentage value
    label?: string; // Optional label
    animate?: boolean; // Whether to animate
    className?: string; // Additional classes
}

export function ProgressCircle({
    value,
    size = 120,
    strokeWidth = 10,
    bgColor = "#f3f4f6",
    fillColor = "#10b981",
    textColor = "#374151",
    showValue = true,
    label,
    animate = true,
    className = "",
}: ProgressCircleProps) {
    // Validate percentage value
    const percentage = Math.min(100, Math.max(0, value));

    // Calculate circle properties
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Background circle */}
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                />

                {/* Progress circle */}
                {animate ? (
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={fillColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                ) : (
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={fillColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                )}
            </svg>

            {/* Text in center */}
            {showValue && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                        className={`text-${size / 4}px font-bold`}
                        style={{ color: textColor }}
                    >
                        {percentage}%
                    </span>
                    {label && (
                        <span className="text-xs text-gray-500 mt-1">
                            {label}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
