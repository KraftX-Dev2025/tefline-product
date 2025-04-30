import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Star,
    HelpCircle,
} from "lucide-react"; // Import HelpCircle and LucideProps
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // Assuming these are your Shadcn UI imports
import { Button } from "@/components/ui/button"; // Assuming this is your Button component
import { AITool } from "@/lib/types"; // Make sure this type is defined correctly
import PromptExamples from "./prompt-examples"; // Your PromptExamples component
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports"; // Import the dynamic imports map

// Define the IconName type based on the keys of dynamicIconImports
type IconName = keyof typeof dynamicIconImports;

// Props interface for the component
interface AIToolCardProps {
    tool: AITool;
    index: number;
}

// AIToolCard Component
export default function AIToolCard({ tool, index }: AIToolCardProps) {
    const [expanded, setExpanded] = useState(false);

    // --- Dynamic Icon Loading Logic ---
    // Cast tool.icon to IconName and check if it's a valid key
    const iconName = tool.icon as IconName;
    const isValidIcon = iconName in dynamicIconImports;

    // Dynamically import the specific icon component using the map
    // Use HelpCircle as a fallback if the icon name is invalid
    const IconComponent = isValidIcon
        ? dynamic(dynamicIconImports[iconName], {
              ssr: false, // Keep client-side rendering if needed
              loading: () => <div className="w-6 h-6" />, // Loading placeholder
          })
        : HelpCircle; // Fallback component (statically imported)
    // --- End Dynamic Icon Loading Logic ---

    // Animation variants
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

    const expandVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.3 },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-accent/20 task-card">
                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 rounded-full bg-accent/10 text-accent">
                            {/* Render the dynamically loaded component or the fallback */}
                            <IconComponent size={24} />
                        </div>
                        <CardTitle className="text-2xl gradient-text">
                            {tool.title}
                        </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                        {tool.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pb-3">
                    {/* Try Tool Button */}
                    <Button
                        variant="gradient" // Assuming you have a 'gradient' variant
                        size="sm"
                        className="w-full"
                        asChild
                    >
                        <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                        >
                            <span>Try {tool.title}</span>
                            <ExternalLink size={16} className="ml-2" />
                        </a>
                    </Button>

                    {/* View/Hide Details Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-3 flex items-center justify-center text-muted-foreground"
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded} // Accessibility improvement
                    >
                        <span>
                            {expanded ? "Hide details" : "View details"}
                        </span>
                        {expanded ? (
                            <ChevronUp size={16} className="ml-1" />
                        ) : (
                            <ChevronDown size={16} className="ml-1" />
                        )}
                    </Button>
                </CardContent>

                {/* Collapsible Details Section */}
                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            key="content" // Added key for AnimatePresence
                            variants={expandVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {/* Example Prompts */}
                            <CardContent className="border-t border-border pt-4 pb-3">
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                    <Star
                                        size={14}
                                        className="mr-1 text-primary" // Assuming 'primary' is defined in your theme
                                    />
                                    Example prompts to try
                                </h4>
                                <PromptExamples
                                    prompts={tool.examplePrompts}
                                    toolUrl={tool.url}
                                />
                            </CardContent>

                            {/* System Prompt */}
                            <CardContent className="border-t border-border pt-4 pb-3">
                                <h4 className="text-sm font-medium mb-2">
                                    System prompt
                                </h4>
                                <div className="bg-secondary/50 p-3 rounded-md text-xs text-muted-foreground">
                                    <pre className="whitespace-pre-wrap font-mono">
                                        {tool.systemPrompt}
                                    </pre>
                                </div>
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Note */}
                <CardFooter className="pt-2 pb-4">
                    <p className="text-xs text-muted-foreground">
                        This tool will open in a new ChatGPT window
                    </p>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

// --- Example AITool Type Definition (adjust as needed) ---
// You should have this defined properly in @/lib/types
// export interface AITool {
//     icon: string; // Must be a valid key from lucide-react/dynamicIconImports
//     title: string;
//     description: string;
//     url: string;
//     examplePrompts: Array<{ prompt: string; description?: string }>; // Example structure
//     systemPrompt: string;
// }
// --- End Example Type Definition ---
