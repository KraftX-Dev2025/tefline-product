"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Info } from "lucide-react";
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

export default function ResourcesPage() {
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

    return (
        <>
            <HeroSection
                title="Wellness Resources"
                subtitle="Browse our curated collection of wellness resources, organized for easy access"
                bgPattern
                gradient
                centered
                size="md"
            />

            <div className="container mx-auto px-4 py-12">
                {/* Google Drive Link */}
                <div className="mb-8">
                    <DriveLink
                        description="All resources are stored in our Google Drive folder. Click below to browse or use the search to find specific topics."
                        showTips={showTips}
                    />
                    <div className="flex justify-end mt-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs flex items-center"
                            onClick={() => setShowTips(!showTips)}
                        >
                            <Info size={14} className="mr-1" />
                            {showTips ? "Hide search tips" : "Show search tips"}
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <form onSubmit={handleSearch} className="flex-grow">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search resources..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-card/50"
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
                                >
                                    {data.name}
                                </Button>
                            )
                        )}
                    </div>
                </div>

                {/* Search Results */}
                {searchTerm && (
                    <Card className="mb-8">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-sm">
                                <FileText size={16} className="text-primary" />
                                <span>
                                    Showing resources matching{" "}
                                    <strong>"{searchTerm}"</strong>
                                </span>

                                <div className="ml-auto">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-xs"
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
                    <div className="text-center py-12">
                        <FileText
                            size={48}
                            className="mx-auto text-muted-foreground mb-4 opacity-50"
                        />
                        <h3 className="text-xl font-medium mb-2">
                            No resources found
                        </h3>
                        <p className="text-muted-foreground mb-4">
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
                    </div>
                )}
            </div>
        </>
    );
}
