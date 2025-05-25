"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Only show a minimal footer for better UX
    return (
        <div className="py-4 px-6 relative bottom-0 left-0 right-0 text-center border-t border-gray-100 bg-white text-sm text-gray-500 mt-auto z-20">
            <p className="flex items-center justify-center">
                &copy; {currentYear} Tefline. Made with{" "}
                <Heart size={14} className="text-teal-400 mx-1" /> for a
                healthier lifestyle
            </p>
        </div>
    );
}
