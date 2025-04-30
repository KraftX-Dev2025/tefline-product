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
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${url}</a>`;
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
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot size={16} className="text-primary" />
                    </div>
                </div>
            )}

            <div className="max-w-[85%]">
                <div
                    className={cn(
                        "chat-bubble",
                        isUser
                            ? "user-chat-bubble rounded-tr-none"
                            : "bot-chat-bubble rounded-tl-none"
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
                        "text-xs text-muted-foreground mt-1",
                        isUser ? "text-right" : "text-left"
                    )}
                >
                    {formattedTime}
                </div>
            </div>

            {/* Avatar for user messages */}
            {isUser && (
                <div className="flex-shrink-0 ml-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <User size={16} className="text-accent" />
                    </div>
                </div>
            )}
        </div>
    );
}
