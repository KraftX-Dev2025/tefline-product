"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Mail, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.2,
            },
        },
    };

    const footerSections = [
        {
            title: "Platform",
            links: [
                { name: "Home", href: "/" },
                { name: "Resources", href: "/resources" },
                { name: "AI Tools", href: "/ai-tools" },
                { name: "Chat", href: "/chat" },
            ],
        },
        {
            title: "Resources",
            links: [
                {
                    name: "Google Drive",
                    href: "https://drive.google.com/drive/folders/1C1CqKbGPuV8DbyauffOUOBS8Fg3mGV3j",
                },
                {
                    name: "Lifestyle Digital",
                    href: "https://chatgpt.com/g/g-lECgVynsO-lifestyle-digital",
                },
                {
                    name: "Cognitive Counselor",
                    href: "https://chatgpt.com/g/g-QTOl4FQbJ-cognitive-counselor",
                },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Help Center", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
            ],
        },
    ];

    return (
        <motion.footer
            className="bg-white border-t border-gray-200 mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerVariants}
        >
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mb-4"
                        >
                            <span className="text-2xl font-bold text-teal-500">
                                Tefline
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-6">
                            Your intelligent companion for wellness and
                            lifestyle medicine.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-teal-500 transition-colors"
                            >
                                <Mail size={18} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-teal-500 transition-colors"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-teal-500 transition-colors"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-teal-500 transition-colors"
                            >
                                <Github size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="col-span-1">
                            <h3 className="font-medium text-teal-500 mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-teal-500 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0">
                        &copy; {currentYear} Tefline. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                        Made with{" "}
                        <Heart size={14} className="text-teal-400 mx-1" /> for a
                        healthier lifestyle
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}