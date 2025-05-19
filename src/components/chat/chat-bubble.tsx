import React from "react";
import { User, Bot } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
    message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
    const isUser = message.sender === "user";
    const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Process message content to add formatting
    const processContent = (content: string) => {
        // Replace URLs with clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let processedContent = content.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#3CCBC9] underline">${url}</a>`;
        });

        // Replace newlines with <br>
        processedContent = processedContent.replace(/\n/g, "<br>");

        // Highlight text between asterisks as bold
        processedContent = processedContent.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

        // Highlight text between underscores as italic
        processedContent = processedContent.replace(
            /\_(.*?)\_/g,
            "<em>$1</em>"
        );

        return processedContent;
    };

    return (
        <div
            className={cn(
                "flex items-start",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {/* Avatar for bot messages */}
            {!isUser && (
                <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-full bg-[#3CCBC9]/10 flex items-center justify-center">
                        <Bot size={16} className="text-[#3CCBC9]" />
                    </div>
                </div>
            )}

            <div className="max-w-[85%]">
                <div
                    className={cn(
                        "rounded-md",
                        isUser
                            ? "bg-[#3CCBC9] text-white rounded-tr-none px-4 py-3"
                            : "bg-gray-100 text-gray-800 rounded-tl-none px-4 py-3"
                    )}
                >
                    <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                            __html: processContent(message.content),
                        }}
                    />
                </div>

                <div
                    className={cn(
                        "text-xs text-gray-400 mt-1",
                        isUser ? "text-right" : "text-left"
                    )}
                >
                    {formattedTime}
                </div>
            </div>

            {/* Avatar for user messages */}
            {isUser && (
                <div className="flex-shrink-0 ml-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={16} className="text-gray-500" />
                    </div>
                </div>
            )}
        </div>
    );
}
