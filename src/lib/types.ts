export interface UserProfile {
    name?: string;
    goals?: string[];
    interests?: string[];
    experience?: "beginner" | "intermediate" | "advanced";
    completedSetup: boolean;
}

export interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    icon: string;
    category: ResourceCategory;
}

export type ResourceCategory =
    | "nutrition"
    | "fitness"
    | "mental"
    | "sleep"
    | "general";

export interface AITool {
    id: string;
    title: string;
    description: string;
    systemPrompt: string;
    url: string;
    icon: string;
    examplePrompts: string[];
}

export interface TaskItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    tutorialContent: string;
    link?: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: number;
}

export interface OnboardingQuestion {
    id: string;
    question: string;
    type: "text" | "multiSelect" | "singleSelect";
    options?: string[];
    placeholder?: string;
}

export interface OnboardingResponse {
    questionId: string;
    answer: string | string[];
}
