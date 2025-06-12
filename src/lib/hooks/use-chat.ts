import { useState, useEffect, useCallback } from "react";
import { ChatMessage } from "@/lib/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import {
    N8N_WEBHOOK_URL,
    CHATBOT_WELCOME_MESSAGE,
} from "@/constants/chatbot-prompts";

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load chat history from localStorage
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

    // Send message to webhook and get response
    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim()) return;
            setError(null);

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
                        history: messages.slice(-5).map((m) => ({
                            content: m.content,
                            sender: m.sender,
                        })),
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

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
                setError(
                    "Failed to connect to the server. Please try again later."
                );

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
        },
        [messages]
    );

    // Clear chat history
    const clearChat = useCallback(() => {
        // Keep only welcome message
        const welcomeMessage = messages.find((msg) => msg.id === "welcome");
        const newMessages = welcomeMessage ? [welcomeMessage] : [];

        setMessages(newMessages);
        saveToLocalStorage("chatMessages", newMessages);
        setError(null);
    }, [messages]);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat,
    };
}
