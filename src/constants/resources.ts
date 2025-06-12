import { Resource, ResourceCategory } from "@/lib/types";
import { MessageSquare, Book, FileText, Heart, Brain, Sparkles, CheckCircle2, Sun, Moon, Globe, User, Bell, Sliders, Shield, Circle, ArrowRight, Info, Home, BookOpen, BrainCircuit, Bot, MessagesSquare } from "lucide-react";
import { SUGGESTED_CHATBOT_PROMPTS } from "./chatbot-prompts";
import { AI_TOOLS } from "./ai-tools";

// Google Drive folder URL
export const GOOGLE_DRIVE_FOLDER_URL =
    "https://drive.google.com/drive/folders/1C1CqKbGPuV8DbyauffOUOBS8Fg3mGV3j";

export const RESOURCE_CATEGORIES: Record<
    ResourceCategory,
    { name: string; description: string; icon: string }
> = {
    nutrition: {
        name: "Nutrition",
        description: "Healthy eating guides and meal planning resources",
        icon: "apple",
    },
    fitness: {
        name: "Fitness",
        description: "Exercise programs and physical activity guides",
        icon: "dumbbell",
    },
    mental: {
        name: "Mental Wellness",
        description: "Resources for stress reduction and mental health",
        icon: "brain",
    },
    sleep: {
        name: "Sleep",
        description: "Guides for improving sleep quality and routines",
        icon: "moon",
    },
    general: {
        name: "General Wellness",
        description: "Comprehensive wellness guides and resources",
        icon: "heart",
    },
};

export const RESOURCES: Resource[] = [
    {
        id: "nutrition-basics",
        title: "Nutrition Fundamentals",
        description:
            "Essential guides to healthy eating principles and nutritional balance",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=nutrition`,
        icon: "utensils",
        category: "nutrition",
    },
    {
        id: "meal-plans",
        title: "Meal Planning Templates",
        description:
            "Customizable templates for weekly meal planning and preparation",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=meal%20plan`,
        icon: "calendar",
        category: "nutrition",
    },
    {
        id: "exercise-programs",
        title: "Exercise Programs",
        description: "Structured workout routines for various fitness levels",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=exercise`,
        icon: "activity",
        category: "fitness",
    },
    {
        id: "home-workouts",
        title: "Home Workout Guides",
        description: "Equipment-free exercises you can do at home",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=home%20workout`,
        icon: "home",
        category: "fitness",
    },
    {
        id: "meditation-guides",
        title: "Meditation Guides",
        description: "Step-by-step instructions for meditation practice",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=meditation`,
        icon: "cloud",
        category: "mental",
    },
    {
        id: "stress-management",
        title: "Stress Management Techniques",
        description: "Effective strategies for managing daily stress",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=stress`,
        icon: "smile",
        category: "mental",
    },
    {
        id: "sleep-hygiene",
        title: "Sleep Hygiene Guide",
        description: "Best practices for improving sleep quality",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=sleep`,
        icon: "bed",
        category: "sleep",
    },
    {
        id: "bedtime-routines",
        title: "Bedtime Routine Builder",
        description: "Create an effective evening routine for better sleep",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=bedtime`,
        icon: "clock",
        category: "sleep",
    },
    {
        id: "wellness-assessment",
        title: "Wellness Self-Assessment",
        description: "Tools to evaluate your current wellness status",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=assessment`,
        icon: "clipboard",
        category: "general",
    },
    {
        id: "lifestyle-medicine",
        title: "Lifestyle Medicine Handbook",
        description:
            "Comprehensive guide to evidence-based lifestyle modifications",
        url: `${GOOGLE_DRIVE_FOLDER_URL}?q=lifestyle%20medicine`,
        icon: "book",
        category: "general",
    },
];

export const RESOURCE_SEARCH_TIPS = [
    "Use specific health terms in the search box to find relevant documents",
    "Google Drive has OCR technology that can search text within images",
    "Combine terms like 'nutrition sleep' to find resources addressing both topics",
    'Use quotation marks for exact phrases, e.g., "meal planning"',
    "Filter results by file type using 'type:pdf' or 'type:doc' in your search",
];

export const helpCategories = [
    {
        title: "Getting Started",
        icon: Book,
        description:
            "Learn the basics of Tefline and how to use the platform",
        articles: [
            "Welcome to Tefline",
            "Setting up your profile",
            "Understanding your dashboard",
        ],
    },
    {
        title: "Resources",
        icon: FileText,
        description: "Learn how to find and use wellness resources",
        articles: [
            "Browsing the resource library",
            "Using Google Drive integration",
            "Resource categories explained",
        ],
    },
    {
        title: "AI Tools",
        icon: MessageSquare,
        description: "Guides for using our specialized AI wellness tools",
        articles: [
            "Getting started with Lifestyle Digital",
            "Cognitive Counselor tutorial",
            "Using the AI Chat Guide",
        ],
    },
];


export const faqItems = [
    {
        question: "How do I access my wellness resources?",
        answer: "You can access all wellness resources through the Resources page. Our curated content is organized by categories and stored in a Google Drive folder for easy access.",
    },
    {
        question: "What is Lifestyle Digital?",
        answer: "Lifestyle Digital is our specialized AI tool that provides personalized wellness recommendations based on lifestyle medicine principles. It's great for questions about nutrition, exercise, sleep, and stress management.",
    },
    {
        question: "How do I track my progress?",
        answer: "Your progress is automatically tracked on your Dashboard. You can view your wellness score, completed goals, and activity history to monitor your wellness journey.",
    },
    {
        question: "Can I use Tefline on mobile devices?",
        answer: "Yes, Tefline is fully responsive and works on all devices including smartphones and tablets.",
    },
];

export const loginIcons = [
    {
        icon: Heart,
        size: 32,
        x: "20%",
        y: "30%",
        color: "text-red-400/40",
    },
    {
        icon: Brain,
        size: 40,
        x: "70%",
        y: "40%",
        color: "text-teal-500/30",
    },
    {
        icon: Sparkles,
        size: 36,
        x: "40%",
        y: "70%",
        color: "text-amber-400/30",
    },
    {
        icon: CheckCircle2,
        size: 28,
        x: "60%",
        y: "20%",
        color: "text-green-500/30",
    },
];

export const loginAppBenefits = [
    "Evidence-based",
    "Personalized",
    "AI-powered",
    "Community-driven",
];

export const settingsPageOptions = [
    "Nutrition",
    "Fitness",
    "Mental health",
    "Sleep",
    "Meditation"
];

export const settingsPageFeats = [
    {
        id: "email",
        label: "Email Notifications",
        description:
            "Receive updates and reports via email",
    },
    {
        id: "app",
        label: "In-App Notifications",
        description:
            "Get notified about activities within the platform",
    },
    {
        id: "weeklyReport",
        label: "Weekly Progress Reports",
        description:
            "Receive a summary of your wellness journey each week",
    },
    {
        id: "goalReminders",
        label: "Goal Reminders",
        description:
            "Get reminders about your wellness goals and tasks",
    },
]

export const tabsConfig = [
    {
        value: "profile",
        icon: User,
        label: "Profile"
    },
    {
        value: "notifications",
        icon: Bell,
        label: "Notifications"
    },
    {
        value: "appearance",
        icon: Sliders,
        label: "Appearance"
    },
    {
        value: "security",
        icon: Shield,
        label: "Security"
    }
];

export const themeOptions = [
    {
        value: "light",
        icon: Sun,
        label: "Light"
    },
    {
        value: "dark",
        icon: Moon,
        label: "Dark"
    },
    {
        value: "system",
        icon: Globe,
        label: "System"
    }
];

export const layoutOptions = [
    {
        name: "Compact",
        height: "16",
        contentHeight: "8",
        gridHeight: "12",
        selected: true
    },
    {
        name: "Comfortable",
        height: "24",
        contentHeight: "12",
        gridHeight: "16",
        selected: false
    }
];

export const securityConnectedAccounts = [
    {
        id: "google",
        name: "Google Account",
        status: "Connected",
        action: "Disconnect",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-500",
        icon: `<svg viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>`
    }
];

// Additional notification types that can be added later
export const additionalNotificationTypes = [
    {
        id: "achievements",
        label: "Achievement Notifications",
        description: "Get notified when you reach milestones and achievements",
    },
    {
        id: "socialUpdates",
        label: "Social Updates",
        description: "Notifications about friends' activities and community posts",
    },
    {
        id: "systemUpdates",
        label: "System Updates",
        description: "Important updates about the platform and new features",
    }
];

// Additional wellness interests that can be added
export const additionalWellnessInterests = [
    "Yoga",
    "Mindfulness",
    "Weight Management",
    "Stress Management",
    "Hydration",
    "Breathing Exercises",
    "Time Management",
    "Self-Care"
];

// Security settings configuration
export const securitySettings = {
    passwordRequirements: [
        "At least 8 characters long",
        "Include uppercase and lowercase letters",
        "Include at least one number",
        "Include at least one special character"
    ],
    twoFactorMethods: [
        {
            id: "sms",
            name: "SMS Authentication",
            description: "Receive codes via text message",
            enabled: false
        },
        {
            id: "authenticator",
            name: "Authenticator App",
            description: "Use apps like Google Authenticator or Authy",
            enabled: false
        },
        {
            id: "email",
            name: "Email Authentication",
            description: "Receive codes via email",
            enabled: true
        }
    ]
};

export const aiToolsOptions =
    [
        {
            title: "Be Specific",
            icon: Circle,
            description:
                "Provide specific details about your goals and situation for more personalized recommendations.",
        },
        {
            title: "Ask Follow-Ups",
            icon: ArrowRight,
            description:
                "Don't hesitate to ask follow-up questions to dig deeper into topics you're interested in.",
        },
        {
            title: "Combine Topics",
            icon: MessageSquare,
            description:
                "Try asking about multiple wellness aspects at once, such as how nutrition impacts sleep.",
        },
    ];


export const aiToolSidebarCards = [
    {
        id: "about",
        title: "About AI Guide",
        icon: Info,
        description:
            "The AI Guide helps you navigate Tefline's resources and features. It can:",
        list: [
            "Explain how to use our Google Drive resources",
            "Guide you on how to use the specialized AI tools",
            "Answer basic questions about wellness and lifestyle medicine",
            "Help you track your progress toward your wellness goals",
        ],
    },
    {
        id: "suggestions",
        title: "Try Asking",
        icon: MessagesSquare,
        description: null,
        promptList: SUGGESTED_CHATBOT_PROMPTS,
    },
    {
        id: "tools",
        title: "Specialized AI Tools",
        icon: Brain,
        description:
            "For more in-depth, specialized guidance, try our dedicated AI tools:",
        toolList: AI_TOOLS,
    },
];

export const onBoardinngOptions = [
    {
        title: "Relevant Resources",
        description:
            "Get access to resources that align with your wellness goals",
    },
    {
        title: "Personalized Journey",
        description:
            "Follow a wellness path designed for your specific needs",
    },
    {
        title: "Effective Guidance",
        description:
            "Receive AI guidance tailored to your experience level",
    },
];

export const registerStats = [
    {
        value: "87%",
        label: "Energy Improvement",
    },
    {
        value: "3.2yr",
        label: "Bio-Age Reduction",
    },
    {
        value: "92%",
        label: "Member Retention",
    },
];

export const registerFeatures = [
    {
        icon: Brain,
        title: "AI-Powered Wellness",
    },
    {
        icon: Heart,
        title: "Evidence-Based Health",
    },
    {
        icon: Sparkles,
        title: "Personalized Journey",
    },
    {
        icon: CheckCircle2,
        title: "Community Support",
    },
];


// Array of wellness tips
export const WELLNESS_TIPS = [
    {
        category: "nutrition",
        text: "Try adding one extra vegetable to your meals today for added nutrients.",
    },
    {
        category: "sleep",
        text: "Set a consistent sleep schedule. Aim to go to bed and wake up at the same time every day.",
    },
    {
        category: "stress",
        text: "Practice box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4.",
    },
    {
        category: "movement",
        text: "Take a 5-minute movement break every hour to refresh your mind and body.",
    },
    {
        category: "hydration",
        text: "Start your day with a glass of water to rehydrate after sleeping.",
    },
    {
        category: "mindfulness",
        text: "Take three deep breaths before responding to stressful situations.",
    },
    {
        category: "social",
        text: "Reach out to a friend or family member you haven't connected with recently.",
    },
    {
        category: "nutrition",
        text: "Aim to fill half your plate with colorful vegetables and fruits.",
    },
];


export const MOODS = [
    {
        emoji: "😊",
        label: "Great",
        color: "bg-green-100 text-green-600 border-green-200",
    },
    {
        emoji: "😌",
        label: "Good",
        color: "bg-teal-100 text-teal-600 border-teal-200",
    },
    {
        emoji: "😐",
        label: "Okay",
        color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    },
    {
        emoji: "😔",
        label: "Down",
        color: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
        emoji: "😫",
        label: "Stressed",
        color: "bg-red-100 text-red-600 border-red-200",
    },
];

export const mobileNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Resources", href: "/resources" },
    { icon: BrainCircuit, label: "AI Tools", href: "/ai-tools" },
    { icon: User, label: "Profile", href: "/profile" },
];


export const sibeBarNavItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BookOpen, label: "Resources", href: "/resources" },
    { icon: BrainCircuit, label: "AI Tools", href: "/ai-tools" },
    { icon: MessageSquare, label: "Chat Guide", href: "/chat" },
    { icon: User, label: "Profile", href: "/profile" },
];