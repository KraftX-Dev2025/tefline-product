import { NextRequest, NextResponse } from "next/server";
import { N8N_WEBHOOK_URL } from "@/constants/chatbot-prompts";

export async function POST(request: NextRequest) {
    try {
        // Get request body
        const body = await request.json();

        // Forward request to n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: body.message,
                userId: body.userId || "anonymous",
                timestamp: Date.now(),
                history: body.history || [],
            }),
        });

        // If response is not OK, throw error
        if (!response.ok) {
            throw new Error(
                `Webhook responded with status: ${response.status}`
            );
        }

        // Get response from n8n webhook
        const data = await response.text();

        // Return response
        return NextResponse.json({ message: data });
    } catch (error) {
        console.error("Error processing chat request:", error);

        // Return error response
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
