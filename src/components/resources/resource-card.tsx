import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
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
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

// Define the IconName type based on the keys of dynamicIconImports
type IconName = keyof typeof dynamicIconImports;

interface ResourceCardProps {
    resource: Resource;
    index: number;
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
    // Cast resource.icon to IconName and check if it's a valid key
    const iconName = resource.icon as IconName;
    const isValidIcon = iconName in dynamicIconImports;

    // Dynamically import the specific icon component or use fallback
    const Icon = isValidIcon
        ? dynamic(dynamicIconImports[iconName], {
              ssr: false,
              loading: () => <div className="w-5 h-5" />,
          })
        : FileText; // Fallback to FileText icon if the icon name is invalid

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
            <Card className="h-full flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="p-2 rounded-full bg-[#3CCBC9]/10 text-[#3CCBC9]">
                            <Icon size={20} />
                        </div>
                        <CardTitle className="text-xl text-gray-800">
                            {resource.title}
                        </CardTitle>
                    </div>
                    <CardDescription className="text-gray-500">
                        {resource.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                    {/* Additional content can be added here */}
                </CardContent>

                <CardFooter className="pt-2 pb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-gray-200 hover:bg-[#3CCBC9]/10 hover:text-[#3CCBC9] hover:border-[#3CCBC9]"
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
