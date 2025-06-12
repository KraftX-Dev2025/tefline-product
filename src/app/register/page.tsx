"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import RegisterForm from "@/components/auth/register-form";
import { WellnessVisual } from "@/components/auth/wellness-visual";

export default function RegisterPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="flex items-stretch overflow-hidden w-full h-full bg-white">
            {/* Left side - Registration form */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center bg-teal-50 px-3 py-1 rounded-full gap-2 text-sm font-medium text-teal-600 mb-4">
                            <Sparkles size={14} className="mr-1" />
                            Join Tefline
                        </div>

                        <h1 className="text-3xl font-bold text-gradient mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-500">
                            Join the wellness intelligence platform
                        </p>
                    </motion.div>
                    <RegisterForm />
                </div>
            </div>
            {/* Right side - Visual illustration */}
            {isMounted && <WellnessVisual />}
        </div>
    );
}
