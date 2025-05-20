"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Bell,
    User,
    Lock,
    Globe,
    Moon,
    Sun,
    ToggleLeft,
    ToggleRight,
    Save,
    Sliders,
    Shield,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/layout/hero-section";

// Define types for notifications state
interface NotificationsState {
    email: boolean;
    app: boolean;
    weeklyReport: boolean;
    goalReminders: boolean;
    [key: string]: boolean; // Index signature to allow string indexing
}

export default function SettingsPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<NotificationsState>({
        email: true,
        app: true,
        weeklyReport: true,
        goalReminders: true,
    });
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
                return;
            }

            // Get user details
            if (session.user) {
                const { user } = session;
                setEmail(user.email || "");
                setName(user.user_metadata?.full_name || "");
            }

            setIsLoading(false);
        };

        checkSession();
    }, [router]);

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would update the user's profile
        console.log("Profile updated");
    };

    const handleNotificationChange = (key: string) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#3CCBC9]/20 border-t-[#3CCBC9] rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeroSection
                title="Settings"
                subtitle="Manage your account preferences and personalize your experience"
                bgPattern
                gradient
                centered
                size="sm"
            />

            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="profile" className="space-y-8">
                    <TabsList className="bg-white border border-gray-200 p-1">
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:bg-[#3CCBC9]/10 data-[state=active]:text-[#3CCBC9]"
                        >
                            <User size={16} className="mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="data-[state=active]:bg-[#3CCBC9]/10 data-[state=active]:text-[#3CCBC9]"
                        >
                            <Bell size={16} className="mr-2" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger
                            value="appearance"
                            className="data-[state=active]:bg-[#3CCBC9]/10 data-[state=active]:text-[#3CCBC9]"
                        >
                            <Sliders size={16} className="mr-2" />
                            Appearance
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="data-[state=active]:bg-[#3CCBC9]/10 data-[state=active]:text-[#3CCBC9]"
                        >
                            <Shield size={16} className="mr-2" />
                            Security
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Settings */}
                    <TabsContent value="profile">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center">
                                        <User
                                            size={20}
                                            className="mr-2 text-[#3CCBC9]"
                                        />
                                        Profile Information
                                    </CardTitle>
                                    <CardDescription>
                                        Update your personal information and how
                                        it's displayed on Tefline
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleUpdateProfile}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                className="h-10"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="h-10"
                                                disabled
                                            />
                                            <p className="text-xs text-gray-500">
                                                To change your email, please
                                                contact support
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="wellness-interests">
                                                Wellness Interests
                                            </Label>
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    "Nutrition",
                                                    "Fitness",
                                                    "Mental health",
                                                    "Sleep",
                                                    "Meditation",
                                                ].map((interest) => (
                                                    <Button
                                                        key={interest}
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-[#3CCBC9]/10 border-[#3CCBC9]/20 text-[#3CCBC9]"
                                                    >
                                                        {interest}
                                                    </Button>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    + Add More
                                                </Button>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#3CCBC9] to-[#935DFD]"
                                        >
                                            <Save size={16} className="mr-2" />
                                            Save Changes
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center">
                                        <Bell
                                            size={20}
                                            className="mr-2 text-[#3CCBC9]"
                                        />
                                        Notification Preferences
                                    </CardTitle>
                                    <CardDescription>
                                        Control when and how you receive updates
                                        from Tefline
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {[
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
                                        ].map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-center border-b border-gray-100 pb-4"
                                            >
                                                <div>
                                                    <h3 className="font-medium text-gray-800">
                                                        {item.label}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleNotificationChange(
                                                            item.id
                                                        )
                                                    }
                                                    className={
                                                        notifications[item.id]
                                                            ? "text-[#3CCBC9]"
                                                            : "text-gray-400"
                                                    }
                                                >
                                                    {notifications[item.id] ? (
                                                        <ToggleRight
                                                            size={28}
                                                        />
                                                    ) : (
                                                        <ToggleLeft size={28} />
                                                    )}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        type="button"
                                        className="bg-gradient-to-r from-[#3CCBC9] to-[#935DFD]"
                                    >
                                        <Save size={16} className="mr-2" />
                                        Save Preferences
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center">
                                        <Sliders
                                            size={20}
                                            className="mr-2 text-[#3CCBC9]"
                                        />
                                        Display Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Customize how Tefline looks and feels
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label>Interface Theme</Label>
                                            <div className="flex gap-4">
                                                <Button
                                                    type="button"
                                                    variant={
                                                        theme === "light"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className={`flex-1 ${
                                                        theme === "light"
                                                            ? "bg-[#3CCBC9]"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleThemeChange(
                                                            "light"
                                                        )
                                                    }
                                                >
                                                    <Sun
                                                        size={16}
                                                        className="mr-2"
                                                    />
                                                    Light Mode
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={
                                                        theme === "dark"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className={`flex-1 ${
                                                        theme === "dark"
                                                            ? "bg-[#3CCBC9]"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleThemeChange(
                                                            "dark"
                                                        )
                                                    }
                                                >
                                                    <Moon
                                                        size={16}
                                                        className="mr-2"
                                                    />
                                                    Dark Mode
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={
                                                        theme === "system"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className={`flex-1 ${
                                                        theme === "system"
                                                            ? "bg-[#3CCBC9]"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleThemeChange(
                                                            "system"
                                                        )
                                                    }
                                                >
                                                    <Globe
                                                        size={16}
                                                        className="mr-2"
                                                    />
                                                    System Default
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Dashboard Layout</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="border border-[#3CCBC9] rounded-lg p-4 flex flex-col items-center">
                                                    <div className="w-full h-16 bg-[#3CCBC9]/10 rounded-md mb-2 flex items-center justify-center">
                                                        <div className="w-3/4 h-8 bg-[#3CCBC9]/20 rounded"></div>
                                                    </div>
                                                    <div className="w-full grid grid-cols-2 gap-2 mb-2">
                                                        <div className="h-12 bg-[#3CCBC9]/10 rounded"></div>
                                                        <div className="h-12 bg-[#3CCBC9]/10 rounded"></div>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        Compact
                                                    </span>
                                                </div>

                                                <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                                                    <div className="w-full h-24 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                                                        <div className="w-3/4 h-12 bg-gray-200 rounded"></div>
                                                    </div>
                                                    <div className="w-full grid grid-cols-2 gap-2 mb-2">
                                                        <div className="h-16 bg-gray-100 rounded"></div>
                                                        <div className="h-16 bg-gray-100 rounded"></div>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        Comfortable
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        type="button"
                                        className="bg-gradient-to-r from-[#3CCBC9] to-[#935DFD]"
                                    >
                                        <Save size={16} className="mr-2" />
                                        Apply Changes
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* Security Settings */}
                    <TabsContent value="security">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center">
                                        <Shield
                                            size={20}
                                            className="mr-2 text-[#3CCBC9]"
                                        />
                                        Account Security
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your password and security
                                        settings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-gray-800 flex items-center">
                                            <Lock
                                                size={16}
                                                className="mr-2 text-[#3CCBC9]"
                                            />
                                            Password
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="current-password">
                                                    Current Password
                                                </Label>
                                                <Input
                                                    id="current-password"
                                                    type="password"
                                                    className="h-10"
                                                />
                                            </div>
                                            <div></div>
                                            <div className="space-y-2">
                                                <Label htmlFor="new-password">
                                                    New Password
                                                </Label>
                                                <Input
                                                    id="new-password"
                                                    type="password"
                                                    className="h-10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirm-password">
                                                    Confirm New Password
                                                </Label>
                                                <Input
                                                    id="confirm-password"
                                                    type="password"
                                                    className="h-10"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                className="bg-[#3CCBC9]"
                                            >
                                                Update Password
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <h3 className="font-medium text-gray-800 flex items-center mb-4">
                                            <Shield
                                                size={16}
                                                className="mr-2 text-[#3CCBC9]"
                                            />
                                            Connected Accounts
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                        <svg
                                                            className="h-5 w-5 text-blue-500"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                                fill="#4285F4"
                                                            />
                                                            <path
                                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                                fill="#34A853"
                                                            />
                                                            <path
                                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                                fill="#FBBC05"
                                                            />
                                                            <path
                                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                                fill="#EA4335"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">
                                                            Google Account
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            Connected
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-gray-600"
                                                >
                                                    Disconnect
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
