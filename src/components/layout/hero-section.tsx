import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
    bgPattern?: boolean;
    gradient?: boolean;
    centered?: boolean;
    size?:  "xs" | "sm" | "md" | "lg";
    children?: React.ReactNode;
}

export default function HeroSection({
    title,
    subtitle,
    ctaText,
    ctaLink,
    bgPattern = true,
    gradient = true,
    centered = true,
    size = "md",
    children,
}: HeroSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const sizeClasses = {
        xs:"py-8",
        sm: "py-12",
        md: "py-20",
        lg: "py-32",
    };

    return (
        <section
            className={`relative overflow-hidden bg-white ${sizeClasses[size]}`}
        >
            {/* Background Pattern */}
            {bgPattern && (
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-[#3CCBC9] rounded-full filter blur-3xl" />
                    <div className="absolute bottom-0 -right-4 w-72 h-72 bg-[#935DFD] rounded-full filter blur-3xl" />
                </div>
            )}

            <div className="container mx-auto px-4">
                <motion.div
                    className={`max-w-3xl ${
                        centered ? "mx-auto text-center" : ""
                    }`}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Title */}
                    <motion.h1
                        className={`text-3xl md:text-5xl font-bold py-4 ${
                            gradient ? "gradient-text" : "text-gray-800"
                        }`}
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-sm md:text-lg text-gray-600 mb-0"
                        variants={itemVariants}
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA Button */}
                    {ctaText && ctaLink && (
                        <motion.div variants={itemVariants}>
                            <Button
                                variant="gradient"
                                size="lg"
                                className="font-medium mt-6"
                                asChild
                            >
                                <a href={ctaLink}>
                                    {ctaText}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </motion.div>
                    )}

                    {/* Additional Content */}
                    {children && (
                        <motion.div className="mt-8" variants={itemVariants}>
                            {children}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
