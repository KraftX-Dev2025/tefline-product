import { Resource, ResourceCategory } from "@/lib/types";

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
