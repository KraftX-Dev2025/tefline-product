"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    HelpCircle,
    Search,
    MessageSquare,
    ArrowRight,
    RefreshCw,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/layout/hero-section";
import { faqItems, helpCategories } from "@/constants/resources";

export default function HelpPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would search the help content
        // console.log("Searching for:", searchQuery);
    };

    return (
        <>
            <HeroSection
                title="Help Center"
                subtitle="Find answers, guides, and support for your wellness journey"
                bgPattern
                gradient
                centered
                size="xs"
            />

            <div className="container mx-auto px-4 py-12">
                {/* Search Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <form onSubmit={handleSearch} className="relative">
                        <Input
                            type="text"
                            placeholder="Search for help topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 pl-12 pr-4 rounded-xl bg-white border-gray-200 shadow-sm"
                        />
                        <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <Button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                        >
                            Search
                        </Button>
                    </form>
                </div>

                {/* Help Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Help Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {helpCategories.map((category, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-center mb-2">
                                        <div className="p-2 bg-[#3CCBC9]/10 rounded-lg mr-3">
                                            <category.icon
                                                className="text-[#3CCBC9]"
                                                size={20}
                                            />
                                        </div>
                                        <CardTitle className="text-xl">
                                            {category.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription>
                                        {category.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {category.articles.map((article, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center text-sm"
                                            >
                                                <ArrowRight
                                                    size={14}
                                                    className="text-[#3CCBC9] mr-2"
                                                />
                                                <span>{article}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-[#3CCBC9]"
                                    >
                                        View All Articles
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                                    <HelpCircle
                                        size={20}
                                        className="text-[#3CCBC9] mr-2 flex-shrink-0 mt-1"
                                    />
                                    <span>{item.question}</span>
                                </h3>
                                <p className="text-gray-600 ml-7">
                                    {item.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Support */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 bg-gradient-to-r from-[#3CCBC9]/10 to-[#935DFD]/10 rounded-xl p-8 text-center"
                >
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                        Still Need Help?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Our support team is ready to assist you with any
                        questions or issues you might have.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="default"
                            className="flex items-center justify-center"
                            onClick={() => router.push("/chat")}
                        >
                            <MessageSquare size={18} className="mr-2" />
                            Chat with AI Guide
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center"
                        >
                            <RefreshCw size={18} className="mr-2" />
                            Visit Knowledge Base
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
