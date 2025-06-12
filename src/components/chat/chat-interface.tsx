import React, { useState, useEffect, useRef, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    RefreshCw,
    Clock,
    Sparkles,
    ExternalLink,
    X,
    Info,
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
import { aiToolSidebarCards } from "@/constants/resources";

interface AITool {
    id: string;
    title: string;
    description: string;
    url: string;
    icon: string;
    examplePrompts: string[];
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(null);
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

        console.log("Sending message:", content);

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
        setInputMessage(""); // Show loading indicator
        setIsLoading(true);
        try {
            console.log("Making API request to /api/chat");
            // Send request to local API route (which forwards to n8n webhook)
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    userId: "user-id", // Can be replaced with actual user ID
                    timestamp: Date.now(),
                }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } // Get response from API route
            const responseData = await response.json();
            const data = responseData.message;

            console.log("Received response:", data);

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

    const openModalHandler = (cardId: any): void => {
        setOpenModal(cardId);
    };

    const closeModalHandler = (): void => {
        setOpenModal(null);
    };

    const renderModalContent = (card: any): JSX.Element => {
        switch (card.id) {
            case "about":
                return (
                    <div className="space-y-4">
                        <p className="text-black">{card.description}</p>
                        <ul className="space-y-2">
                            {card.list?.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                    <span className="text-[#3CCBC9] mr-2 mt-1">
                                        •
                                    </span>
                                    <span className="text-gray-600">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "suggestions":
                return (
                    <div className="space-y-4">
                        <p className="text-black mb-4">
                            Try asking these questions:
                        </p>
                        <div className="space-y-3">
                            {card.promptList?.map(
                                (prompt: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="p-3 bg-[#3CCBC9]/5 rounded-lg border border-[#3CCBC9]/20 cursor-pointer hover:bg-[#3CCBC9]/10 transition-colors"
                                        onClick={() => {
                                            sendMessage(prompt);
                                            closeModalHandler();
                                        }}
                                    >
                                        <p className="text-sm text-gray-700">
                                            "{prompt}"
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                );
            case "tools":
                return (
                    <div className="space-y-4">
                        <p className="text-black mb-4">{card.description}</p>
                        <div className="space-y-3">
                            {card.toolList?.map((tool: AITool) => (
                                <div
                                    key={tool.id}
                                    className="p-4 border border-gray-200 rounded-lg hover:border-[#3CCBC9]/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium text-gray-800">
                                            {tool.title}
                                        </h4>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="hover:bg-teal-600/10 gradient-text gradient-bg border-2 border-amber-500 hover:border-teal-600"
                                        >
                                            <a
                                                href={tool.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1"
                                            >
                                                Open Tool
                                                <ExternalLink size={14} />
                                            </a>
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {tool.description}
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Example Prompts:
                                        </p>
                                        {tool.examplePrompts
                                            .slice(0, 2)
                                            .map(
                                                (
                                                    prompt: string,
                                                    idx: number
                                                ) => (
                                                    <p
                                                        key={idx}
                                                        className="text-xs text-gray-500 italic"
                                                    >
                                                        • {prompt}
                                                    </p>
                                                )
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <p>Content not available</p>;
        }
    };

    return (
        <div className="flex flex-col h-[600px] md:h-[700px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#3CCBC9]/10 flex items-center justify-center">
                        <Sparkles size={18} className="text-[#3CCBC9]" />
                    </div>
                    <div>
                        <h3 className="font-medium text-[#3CCBC9]">AI Guide</h3>
                        <p className="text-xs text-gray-500">
                            Your wellness assistant
                        </p>
                    </div>
                </div>
                {/* Modals for aiToolSidebarCards */}
                <div className="flex items-center justify-center gap-4 text-center">
                    {aiToolSidebarCards.map((card) => (
                        <Button
                            variant="outline"
                            key={card.id}
                            className="rounded-full bg-[#3CCBC9]/10 text-teal-600 hover:bg-teal-600 border-none hover:text-white"
                            onClick={() => openModalHandler(card.id)}
                        >
                            <card.icon size={18} />
                            {/* <p className="text-sm hidden sm:flex">{card.title}</p> */}
                        </Button>
                    ))}

                    <Button
                        variant="default"
                        size="sm"
                        onClick={clearChat}
                        className="flex flex-col items-center text-white rounded-2xl hover:bg-teal-200 hover:text-teal-800"
                    >
                        <RefreshCw size={14} />
                    </Button>
                </div>
            </div>

            {/* Chat Messages */}
            <div
                ref={messageContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50"
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
                        className="flex items-center space-x-2 text-sm text-gray-500"
                    >
                        <div className="flex space-x-1">
                            <span className="animate-pulse bg-[#3CCBC9] rounded-full w-2 h-2"></span>
                            <span
                                className="animate-pulse bg-[#3CCBC9] rounded-full w-2 h-2"
                                style={{ animationDelay: "0.2s" }}
                            ></span>
                            <span
                                className="animate-pulse bg-[#3CCBC9] rounded-full w-2 h-2"
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
                <div className="px-4 py-3 border-t border-gray-200 bg-white">
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_CHATBOT_PROMPTS.slice(0, 3).map(
                            (prompt, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs py-1 h-auto text-[#3CCBC9] border-[#3CCBC9]/30 hover:bg-[#3CCBC9]/10"
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
                className="p-4 border-t border-gray-200 bg-white"
            >
                <div className="flex space-x-2">
                    {/* <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 text-gray-400"
                    >
                        <Plus size={18} />
                    </Button> */}

                    <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="bg-white border-gray-200"
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        variant="default"
                        size="icon"
                        className="flex-shrink-0 bg-[#3CCBC9] hover:bg-[#35b5b3]"
                        disabled={!inputMessage.trim() || isLoading}
                    >
                        <Send size={18} />
                    </Button>
                </div>

                <div className="flex items-center justify-center mt-3">
                    <Clock size={12} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-400">
                        Messages are stored locally and not saved on our servers
                    </span>
                </div>
            </form>
            {/* Modal Overlay */}
            <AnimatePresence>
                {openModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModalHandler}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-[#3CCBC9]/10">
                                        {(() => {
                                            const foundCard =
                                                aiToolSidebarCards.find(
                                                    (card) =>
                                                        card.id === openModal
                                                );
                                            const IconComponent =
                                                foundCard?.icon || Info;
                                            return (
                                                <IconComponent
                                                    size={20}
                                                    className="text-[#3CCBC9]"
                                                />
                                            );
                                        })()}
                                    </div>
                                    <h2 className="text-xl font-semibold text-teal-600">
                                        {
                                            aiToolSidebarCards.find(
                                                (card) => card.id === openModal
                                            )?.title
                                        }
                                    </h2>
                                </div>
                                <Button
                                    variant="glass"
                                    size="icon"
                                    onClick={closeModalHandler}
                                    className="text-red-500 rounded-sm hover:bg-red-300"
                                >
                                    <X size={20} />
                                </Button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                {renderModalContent(
                                    aiToolSidebarCards.find(
                                        (card) => card.id === openModal
                                    )
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
