import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind's merge functionality
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Saves data to localStorage with error handling
 */
export function saveToLocalStorage(key: string, value: any): boolean {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
        return false;
    }
}

/**
 * Retrieves data from localStorage with error handling
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return defaultValue;
        }
        return JSON.parse(serializedValue) as T;
    } catch (error) {
        console.error(`Error retrieving from localStorage: ${error}`);
        return defaultValue;
    }
}

/**
 * Animates count up from zero to target number
 */
export function animateCount(
    element: HTMLElement | null,
    target: number,
    duration = 1000
): void {
    if (!element) return;

    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start).toString();

        if (start >= target) {
            element.textContent = target.toString();
            clearInterval(timer);
        }
    }, 16);
}

/**
 * Formats date to readable string
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}
