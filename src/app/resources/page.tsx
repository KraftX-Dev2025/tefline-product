"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Info, BookOpen, Folder } from "lucide-react";
import HeroSection from "@/components/layout/hero-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResourceCard from "@/components/resources/resource-card";
import DriveLink from "@/components/resources/drive-link";
import {
    RESOURCES,
    RESOURCE_CATEGORIES,
    RESOURCE_SEARCH_TIPS,
} from "@/constants/resources";
import { ResourceCategory } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ResourcesPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<
        ResourceCategory | "all"
    >("all");
    const [showTips, setShowTips] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is handled via state, no need for additional logic
    };

    const filteredResources = RESOURCES.filter((resource) => {
        const matchesSearch =
            searchTerm === "" ||
            resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" ||
            resource.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

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

    return (
        <>
            <HeroSection
                title="Wellness Resources"
                subtitle="Browse our curated collection of wellness resources, organized for easy access"
                bgPattern
                gradient
                centered
                size="xs"
            />

            <div className="container mx-auto px-4 py-12">
                {/* Google Drive Link with new design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Card className="bg-gradient-to-r from-[#3CCBC9]/10 to-[#935DFD]/10 border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="p-4 bg-white rounded-xl shadow-sm">
                                    <Folder className="h-8 w-8 text-[#3CCBC9]" />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Air Tenet
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        All resources are stored in our Google
                                        Drive folder. Click below to browse or
                                        use the search to find specific topics.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            className="bg-[#3CCBC9] hover:bg-[#35b5b3]"
                                            asChild
                                        >
                                            <a
                                                href={`https://drive.google.com/drive/folders/1C1CqKbGPuV8DbyauffOUOBS8Fg3mGV3j`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Browse All Resources
                                            </a>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs flex items-center"
                                            onClick={() =>
                                                setShowTips(!showTips)
                                            }
                                        >
                                            <Info size={14} className="mr-1" />
                                            {showTips
                                                ? "Hide search tips"
                                                : "Show search tips"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Search Tips */}
                            {showTips && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 bg-white rounded-lg p-4 border border-gray-100"
                                >
                                    <h4 className="text-sm font-medium flex items-center text-gray-700 mb-3">
                                        <BookOpen
                                            size={14}
                                            className="mr-2 text-[#3CCBC9]"
                                        />
                                        Drive Search Tips
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                                        {RESOURCE_SEARCH_TIPS.map(
                                            (tip, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start"
                                                >
                                                    <span className="text-[#3CCBC9] mr-2">
                                                        •
                                                    </span>
                                                    <span>{tip}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    <form onSubmit={handleSearch} className="flex-grow">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search resources..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-gray-200 shadow-sm h-12"
                            />
                        </div>
                    </form>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={
                                selectedCategory === "all"
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedCategory("all")}
                            className={
                                selectedCategory === "all" ? "bg-[#3CCBC9]" : ""
                            }
                        >
                            All
                        </Button>

                        {Object.entries(RESOURCE_CATEGORIES).map(
                            ([category, data]) => (
                                <Button
                                    key={category}
                                    variant={
                                        selectedCategory === category
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                        setSelectedCategory(
                                            category as ResourceCategory
                                        )
                                    }
                                    className={
                                        selectedCategory === category
                                            ? "bg-[#3CCBC9]"
                                            : ""
                                    }
                                >
                                    {data.name}
                                </Button>
                            )
                        )}
                    </div>
                </motion.div>

                {/* Search Results */}
                {searchTerm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="mb-8 border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <FileText
                                        size={16}
                                        className="text-[#3CCBC9]"
                                    />
                                    <span>
                                        Showing resources matching{" "}
                                        <strong>"{searchTerm}"</strong>
                                    </span>

                                    <div className="ml-auto">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs text-[#3CCBC9]"
                                            asChild
                                        >
                                            <a
                                                href={`https://drive.google.com/drive/folders/1C1CqKbGPuV8DbyauffOUOBS8Fg3mGV3j?q=${encodeURIComponent(
                                                    searchTerm
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Search in Google Drive
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Resources Grid */}
                {filteredResources.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredResources.map((resource, index) => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                index={index}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center py-12"
                    >
                        <FileText
                            size={48}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-medium mb-2 text-gray-800">
                            No resources found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or category filters
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("all");
                            }}
                        >
                            Clear filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </>
    );
}
