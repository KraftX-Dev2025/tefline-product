import { AITool } from "@/lib/types";

export const LIFESTYLE_DIGITAL_URL =
    "https://chatgpt.com/g/g-lECgVynsO-lifestyle-digital";
export const COGNITIVE_COUNSELOR_URL =
    "https://chatgpt.com/g/g-QTOl4FQbJ-cognitive-counselor";

export const LIFESTYLE_DIGITAL_SYSTEM_PROMPT = `
You're interacting with **Lifestyle Digital**, a specialized GPT designed for Tefline — The Epicenter for Lifestyle Medicine. Its role is to support Centre Directors, the Chief Wellness Officer, and Clients/Patients through expert guidance grounded in lifestyle medicine. It draws on a curated corpus of literature to offer advice on:
* Business strategy and operations (Centre Directors)
* Personalized lifestyle recommendations (Chief Wellness Officer and Clients)
* Clinical support, patient care, and case review (Chief Wellness Officer)
The system is designed to provide clear, evidence-based, and layperson-accessible recommendations that follow lifestyle medicine principles. It avoids hallucinations and prioritizes accuracy, context-awareness, and actionable guidance.
`;

export const COGNITIVE_COUNSELOR_SYSTEM_PROMPT = `
You are a GPT called "Cognitive Counselor." Your role is to identify and elaborate on cognitive distortions, including biases, effects, fallacies, heuristics, and psychological phenomena in user-provided text. You respond with in-depth, comprehensive analyses while maintaining a conversational and friendly tone. Your goal is to make complex cognitive concepts accessible and engaging to a wide audience. Accuracy and educational value are paramount. Offer detailed insights and examples. You may ask for clarification if needed, but should generally rely on the provided information to deliver a thorough response. Your demeanor is professional yet friendly, helping to foster curiosity and understanding around cognitive science topics.
`;

export const AI_TOOLS: AITool[] = [
    {
        id: "lifestyle-digital",
        title: "Lifestyle Digital",
        description:
            "Your specialized wellness advisor providing expert guidance on lifestyle medicine principles, personalized health recommendations, and evidence-based wellness strategies.",
        systemPrompt: LIFESTYLE_DIGITAL_SYSTEM_PROMPT,
        url: LIFESTYLE_DIGITAL_URL,
        icon: "heart-pulse",
        examplePrompts: [
            "What dietary changes would help improve my sleep quality?",
            "Can you suggest a weekly exercise routine for a beginner?",
            "How can I incorporate more plant-based foods into my diet?",
            "What stress management techniques work best for busy professionals?",
            "How can I create a morning routine that supports overall wellness?",
        ],
    },
    {
        id: "cognitive-counselor",
        title: "Cognitive Counselor",
        description:
            "An analysis tool that helps identify cognitive distortions, biases, and psychological phenomena in your thinking patterns, offering insights to improve mental clarity.",
        systemPrompt: COGNITIVE_COUNSELOR_SYSTEM_PROMPT,
        url: COGNITIVE_COUNSELOR_URL,
        icon: "brain",
        examplePrompts: [
            "I keep thinking I'll fail at anything new I try.",
            "Everyone at work thinks I'm incompetent because I made one mistake.",
            "If I can't do this perfectly, there's no point in trying at all.",
            "I should be able to handle everything without feeling stressed.",
            "Analyze my thought pattern: 'Nothing ever works out for me.'",
        ],
    },
];

export const AI_TOOL_USAGE_TIPS = [
    "Be specific about your wellness goals when asking questions",
    "Provide relevant context about your situation for more personalized advice",
    "Ask for clarification if you don't understand any recommendations",
    "Try combining questions about different wellness aspects (e.g., nutrition and sleep)",
    "Use follow-up questions to dig deeper into topics you're interested in",
];
