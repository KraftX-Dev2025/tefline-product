"use client";

import Link from "next/link";
import Image from "next/image";

export default function AuthNavbar() {
    return (
        <nav className="w-full bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                                src="/favicon.png"
                                alt="Tefline Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </div>
                        <span className="text-xl font-semibold gradient-text">
                            Tefline
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
