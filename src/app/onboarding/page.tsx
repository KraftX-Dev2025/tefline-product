"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HeroSection from "@/components/layout/hero-section";
import OnboardingForm from "@/components/onboarding/onboarding-form";
import { getFromLocalStorage } from "@/lib/utils";
import { UserProfile } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { onBoardinngOptions } from "@/constants/resources";

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
            }
        };
        checkSession();
    }, [router]);

    useEffect(() => {
        // Check if user has already completed onboarding
        const userProfile = getFromLocalStorage<UserProfile | null>(
            "userProfile",
            null
        );

        if (userProfile?.completedSetup) {
            // If onboarding is already completed, redirect to home page
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeroSection
                title="Welcome to Tefline"
                subtitle="Let's get to know you better to personalize your wellness journey"
                bgPattern
                gradient
                centered
                size="xs"
            />

            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <OnboardingForm />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-16 max-w-2xl mx-auto text-center"
                >
                    <h3 className="text-xl font-medium mb-4">
                        Why Personalization Matters
                    </h3>
                    <p className="text-muted-foreground mb-8">
                        Your responses help us tailor resources and
                        recommendations to your specific wellness goals and
                        interests. This information is stored locally on your
                        device and is used only to enhance your experience with
                        Tefline.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {onBoardinngOptions.map((item, index) => (
                            <div
                                key={index}
                                className="bg-card/30 p-4 rounded-lg border border-border"
                            >
                                <h4 className="font-medium mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
