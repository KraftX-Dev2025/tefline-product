import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Plus,
    RefreshCw,
    Clock,
    MessageCircle,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "./chat-bubble";
import { ChatMessage } from "@/lib/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import {
    CHATBOT_WELCOME_MESSAGE,
    SUGGESTED_CHATBOT_PROMPTS,
    N8N_WEBHOOK_URL,
} from "@/constants/chatbot-prompts";

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Load messages from localStorage
    useEffect(() => {
        const savedMessages = getFromLocalStorage<ChatMessage[]>(
            "chatMessages",
            []
        );

        // If no messages, add welcome message
        if (savedMessages.length === 0) {
            const welcomeMessage: ChatMessage = {
                id: "welcome",
                content: CHATBOT_WELCOME_MESSAGE,
                sender: "bot",
                timestamp: Date.now(),
            };
            setMessages([welcomeMessage]);
            saveToLocalStorage("chatMessages", [welcomeMessage]);
        } else {
            setMessages(savedMessages);
        }
    }, []);

    useEffect(() => {
        const container = messageContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        // Create user message
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            content,
            sender: "user",
            timestamp: Date.now(),
        };

        // Add user message to chat
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        saveToLocalStorage("chatMessages", updatedMessages);

        // Clear input
        setInputMessage("");

        // Show loading indicator
        setIsLoading(true);

        try {
            // Send request to n8n webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    userId: "user-id", // Can be replaced with actual user ID
                    timestamp: Date.now(),
                }),
            });

            // Get response from n8n webhook
            const data = await response.text();

            // Create bot response message
            const botMessage: ChatMessage = {
                id: `bot-${Date.now()}`,
                content:
                    data ||
                    "I'm sorry, I couldn't process your request. Please try again.",
                sender: "bot",
                timestamp: Date.now(),
            };

            // Add bot message to chat
            const newMessages = [...updatedMessages, botMessage];
            setMessages(newMessages);
            saveToLocalStorage("chatMessages", newMessages);
        } catch (error) {
            console.error("Error sending message:", error);

            // Create error message
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                content:
                    "I'm sorry, there was an error connecting to the server. Please try again later.",
                sender: "bot",
                timestamp: Date.now(),
            };

            // Add error message to chat
            const newMessages = [...updatedMessages, errorMessage];
            setMessages(newMessages);
            saveToLocalStorage("chatMessages", newMessages);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputMessage);
    };

    const clearChat = () => {
        // Keep only welcome message
        const welcomeMessage = messages.find((msg) => msg.id === "welcome");
        const newMessages = welcomeMessage ? [welcomeMessage] : [];

        setMessages(newMessages);
        saveToLocalStorage("chatMessages", newMessages);
    };

    return (
        <div className="flex flex-col h-[600px] md:h-[700px] bg-card/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/60">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles size={18} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-medium">AI Guide</h3>
                        <p className="text-xs text-muted-foreground">
                            Your wellness assistant
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="flex items-center text-xs"
                >
                    <RefreshCw size={14} className="mr-1" />
                    Clear chat
                </Button>
            </div>

            {/* Chat Messages */}
            <div
                ref={messageContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-4"
            >
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChatBubble message={message} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading indicator */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                    >
                        <div className="flex space-x-1">
                            <span className="animate-pulse bg-primary/60 rounded-full w-2 h-2"></span>
                            <span
                                className="animate-pulse bg-primary/60 rounded-full w-2 h-2"
                                style={{ animationDelay: "0.2s" }}
                            ></span>
                            <span
                                className="animate-pulse bg-primary/60 rounded-full w-2 h-2"
                                style={{ animationDelay: "0.4s" }}
                            ></span>
                        </div>
                        <span>Thinking...</span>
                    </motion.div>
                )}

                <div ref={messageEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length <= 2 && (
                <div className="px-4 py-3 border-t border-border">
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                        <MessageCircle size={12} className="mr-1" />
                        Suggested questions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_CHATBOT_PROMPTS.slice(0, 3).map(
                            (prompt, index) => (
                                <Button
                                    key={index}
                                    variant="glass"
                                    size="sm"
                                    className="text-xs py-1 h-auto"
                                    onClick={() => sendMessage(prompt)}
                                >
                                    {prompt}
                                </Button>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Chat Input */}
            <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-border bg-card/60"
            >
                <div className="flex space-x-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                    >
                        <Plus size={18} />
                    </Button>

                    <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="bg-secondary/30"
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        variant="gradient"
                        size="icon"
                        className="flex-shrink-0"
                        disabled={!inputMessage.trim() || isLoading}
                    >
                        <Send size={18} />
                    </Button>
                </div>

                <div className="flex items-center justify-center mt-3">
                    <Clock size={12} className="text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                        Messages are stored locally and not saved on our servers
                    </span>
                </div>
            </form>
        </div>
    );
}
