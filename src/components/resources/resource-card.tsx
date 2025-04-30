import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Resource } from "@/lib/types";
import { LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";

interface ResourceCardProps {
    resource: Resource;
    index: number;
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
    // Dynamically import icons to match the icon name from resource data
    const Icon = dynamic(
        () =>
            import("lucide-react").then(
                (mod) =>
                    mod[
                        resource.icon as keyof typeof import("lucide-react")
                    ] as LucideIcon
            ),
        { ssr: false, loading: () => <div className="w-5 h-5" /> }
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <Card className="h-full flex flex-col bg-card/70 overflow-hidden backdrop-blur-sm task-card">
                <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Icon size={20} />
                        </div>
                        <CardTitle className="text-xl">
                            {resource.title}
                        </CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                    {/* Additional content can be added here */}
                </CardContent>

                <CardFooter className="pt-2 pb-4">
                    <Button
                        variant="glass"
                        size="sm"
                        className="w-full"
                        asChild
                    >
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                        >
                            <span>Open Resource</span>
                            <ExternalLink size={16} className="ml-2" />
                        </a>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
