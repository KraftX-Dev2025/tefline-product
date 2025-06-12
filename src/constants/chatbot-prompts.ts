// N8N webhook URL for the chatbot
export const N8N_WEBHOOK_URL =
    "https://n8n.srv850966.hstgr.cloud/webhook-test/84f66fe4-4469-41e7-9569-da2430a379dc";

// System message that defines the chatbot's purpose and capabilities
export const CHATBOT_SYSTEM_MESSAGE = `
You are an AI guide for Tefline, a wellness and lifestyle medicine platform. Your role is to:

1. Help users navigate the platform's resources (Google Drive folder)
2. Explain how to use the specialized AI tools (Lifestyle Digital and Cognitive Counselor)
3. Answer basic questions about wellness and lifestyle medicine
4. Guide users through their wellness journey based on their goals

When users ask about resources, direct them to the Google Drive folder. When they ask about specific wellness topics, recommend they try the specialized AI tools for more detailed guidance.
`;

// Initial welcome message from the chatbot
export const CHATBOT_WELCOME_MESSAGE = `
Hello! I'm your AI guide for Tefline. I'm here to help you make the most of our wellness resources and tools. 

I can help you:
• Navigate our Google Drive resources
• Learn how to use our specialized AI tools
• Understand the basics of lifestyle medicine
• Track your progress toward your wellness goals

What would you like help with today?
`;

// Suggested prompts for users to try with the chatbot
export const SUGGESTED_CHATBOT_PROMPTS = [
    "How do I find resources about sleep improvement?",
    "What's the difference between the two AI tools?",
    "Can you explain how to search in the Google Drive folder?",
    "What is lifestyle medicine?",
    "How can I track my progress on the platform?",
];

// Responses for frequently asked questions
export const FAQ_RESPONSES = {
    resources: `
Our resources are organized in a Google Drive folder that contains guides, worksheets, and information about various wellness topics. 

To access these resources:
1. Click on the "Resources" tab in the navigation
2. Browse categories or use the search function
3. Click on any resource to open it directly in Google Drive

You can search within the Drive folder using keywords related to your interests like "nutrition," "sleep," or "stress management."
  `,

    aiTools: `
Tefline offers two specialized AI tools:

1. **Lifestyle Digital**: Provides personalized wellness recommendations based on lifestyle medicine principles. Great for questions about nutrition, exercise, sleep, and stress management.

2. **Cognitive Counselor**: Helps identify cognitive distortions and thought patterns. Useful for understanding how your thinking affects your well-being.

To use either tool, click on the "AI Tools" tab and select the one you'd like to try. You'll be redirected to a ChatGPT interface where you can start your conversation.
  `,

    chatbot: `
I'm your AI guide for navigating Tefline. I can help explain how to use the platform, point you to relevant resources, and answer basic questions about wellness.

For deeper, personalized advice, I recommend using our specialized AI tools:
- Lifestyle Digital for lifestyle medicine guidance
- Cognitive Counselor for mental wellness support

Think of me as your orientation guide to get the most out of what Tefline offers!
  `,

    lifestyleMedicine: `
Lifestyle Medicine is an evidence-based approach to preventing, treating, and reversing diseases by addressing their root causes through healthy habits.

It focuses on six key pillars:
1. Nutrition (whole food, plant-predominant eating)
2. Physical activity
3. Stress management
4. Quality sleep
5. Positive social connections
6. Avoidance of risky substances

Rather than just treating symptoms, lifestyle medicine empowers you to make sustainable changes that improve your overall health and wellbeing.
  `,
};
