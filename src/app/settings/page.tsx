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
    LogOut,
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
import { 
    settingsPageFeats, 
    settingsPageOptions, 
    themeOptions, 
    layoutOptions,
    tabsConfig,
    securityConnectedAccounts 
} from "@/constants/resources";

// Define types for notifications state
interface NotificationsState {
    email: boolean;
    app: boolean;
    weeklyReport: boolean;
    goalReminders: boolean;
    [key: string]: boolean;
}

// Reusable components
const MotionCard = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const CardHeaderWithIcon = ({ 
    icon: Icon, 
    title, 
    description 
}: { 
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    description: string;
}) => (
    <CardHeader>
        <CardTitle className="text-xl flex items-center">
            <Icon size={20} className="mr-2 text-[#3CCBC9]" />
            {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
    </CardHeader>
);

const SaveButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <Button
        type="button"
        className="bg-gradient-to-r from-[#3CCBC9] to-[#935DFD]"
        {...props}
    >
        <Save size={16} className="mr-2" />
        {children}
    </Button>
);

const NotificationToggle = ({ 
    item, 
    isEnabled, 
    onToggle 
}: { 
    item: typeof settingsPageFeats[0];
    isEnabled: boolean;
    onToggle: () => void;
}) => (
    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
            <h3 className="font-medium text-teal-500">{item.label}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
        </div>
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={isEnabled ? "text-[#3CCBC9]" : "text-gray-400"}
        >
            {isEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
        </Button>
    </div>
);

const ThemeButton = ({ 
    theme, 
    currentTheme, 
    onThemeChange,
    icon: Icon,
    label 
}: {
    theme: string;
    currentTheme: string;
    onThemeChange: (theme: string) => void;
    icon: React.ComponentType<{ size: number; className?: string }>;
    label: string;
}) => (
    <Button
        type="button"
        variant={currentTheme === theme ? "default" : "outline"}
        className={`flex-1 ${currentTheme === theme ? "bg-[#3CCBC9]" : ""}`}
        onClick={() => onThemeChange(theme)}
    >
        <Icon size={16} className="mr-2" />
        {label}
    </Button>
);

const LayoutOption = ({ 
    option, 
    isSelected 
}: { 
    option: typeof layoutOptions[0];
    isSelected: boolean;
}) => (
    <div className={`border ${isSelected ? 'border-[#3CCBC9]' : 'border-gray-200'} rounded-lg p-4 flex flex-col items-center`}>
        <div className={`w-full h-${option.height} ${isSelected ? 'bg-[#3CCBC9]/10' : 'bg-gray-100'} rounded-md mb-2 flex items-center justify-center`}>
            <div className={`w-3/4 h-${option.contentHeight} ${isSelected ? 'bg-[#3CCBC9]/20' : 'bg-gray-200'} rounded`}></div>
        </div>
        <div className="w-full grid grid-cols-2 gap-2 mb-2">
            <div className={`h-${option.gridHeight} ${isSelected ? 'bg-[#3CCBC9]/10' : 'bg-gray-100'} rounded`}></div>
            <div className={`h-${option.gridHeight} ${isSelected ? 'bg-[#3CCBC9]/10' : 'bg-gray-100'} rounded`}></div>
        </div>
        <span className="text-sm font-medium">{option.name}</span>
    </div>
);

const ConnectedAccount = ({ 
    account 
}: { 
    account: typeof securityConnectedAccounts[0];
}) => (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center">
            <div className={`w-10 h-10 ${account.bgColor} rounded-full flex items-center justify-center mr-4`}>
                <div 
                    className={`h-5 w-5 ${account.iconColor}`}
                    dangerouslySetInnerHTML={{ __html: account.icon }}
                />
            </div>
            <div>
                <h4 className="font-medium text-gray-800">{account.name}</h4>
                <p className="text-sm text-gray-500">{account.status}</p>
            </div>
        </div>
        <Button variant="outline" size="sm" className="text-gray-600">
            {account.action}
        </Button>
    </div>
);

const FormField = ({ 
    id, 
    label, 
    type = "text", 
    value, 
    onChange, 
    disabled = false,
    helpText 
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    helpText?: string;
}) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className="h-10"
            disabled={disabled}
        />
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
);

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
        // console.log("Profile updated");
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
                size="xs"
            />

            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="profile" className="space-y-8">
                    <TabsList className="bg-white border border-gray-200 p-1">
                        {tabsConfig.map(({ value, icon: Icon, label }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className="data-[state=active]:bg-[#3CCBC9]/10 data-[state=active]:text-[#3CCBC9]"
                            >
                                <Icon size={16} className="mr-2" />
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Profile Settings */}
                    <TabsContent value="profile">
                        <MotionCard>
                            <Card>
                                <CardHeaderWithIcon
                                    icon={User}
                                    title="Profile Information"
                                    description="Update your personal information and how it's displayed on Tefline"
                                />
                                <CardContent>
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <FormField
                                            id="name"
                                            label="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                        <FormField
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                            helpText="To change your email, please contact support"
                                        />

                                        <div className="space-y-2">
                                            <Label htmlFor="wellness-interests">Wellness Interests</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {settingsPageOptions.map((interest) => (
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
                                                    variant="secondary"
                                                    size="sm"
                                                    className="text-white bg-teal-600"
                                                >
                                                    + Add More
                                                </Button>
                                            </div>
                                        </div>

                                        <SaveButton type="submit">Save Changes</SaveButton>
                                    </form>
                                </CardContent>
                            </Card>
                        </MotionCard>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                        <MotionCard>
                            <Card>
                                <CardHeaderWithIcon
                                    icon={Bell}
                                    title="Notification Preferences"
                                    description="Control when and how you receive updates from Tefline"
                                />
                                <CardContent>
                                    <div className="space-y-6">
                                        {settingsPageFeats.map((item) => (
                                            <NotificationToggle
                                                key={item.id}
                                                item={item}
                                                isEnabled={notifications[item.id]}
                                                onToggle={() => handleNotificationChange(item.id)}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <SaveButton>Save Preferences</SaveButton>
                                </CardFooter>
                            </Card>
                        </MotionCard>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance">
                        <MotionCard>
                            <Card>
                                <CardHeaderWithIcon
                                    icon={Sliders}
                                    title="Display Settings"
                                    description="Customize how Tefline looks and feels"
                                />
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-teal-500 text-xl">Interface Theme</Label>
                                            <div className="flex gap-4">
                                                {themeOptions.map(({ value, icon, label }) => (
                                                    <ThemeButton
                                                        key={value}
                                                        theme={value}
                                                        currentTheme={theme}
                                                        onThemeChange={handleThemeChange}
                                                        icon={icon}
                                                        label={label}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-teal-500 text-xl">Dashboard Layout</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {layoutOptions.map((option) => (
                                                    <LayoutOption
                                                        key={option.name}
                                                        option={option}
                                                        isSelected={option.name === "Compact"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <SaveButton>Apply Changes</SaveButton>
                                </CardFooter>
                            </Card>
                        </MotionCard>
                    </TabsContent>

                    {/* Security Settings */}
                    <TabsContent value="security">
                        <MotionCard>
                            <Card>
                                <CardHeaderWithIcon
                                    icon={Shield}
                                    title="Account Security"
                                    description="Manage your password and security settings"
                                />
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-gray-800 flex items-center">
                                            <Lock size={16} className="mr-2 text-[#3CCBC9]" />
                                            Password
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                id="current-password"
                                                label="Current Password"
                                                type="password"
                                                value=""
                                                onChange={() => {}}
                                            />
                                            <div></div>
                                            <FormField
                                                id="new-password"
                                                label="New Password"
                                                type="password"
                                                value=""
                                                onChange={() => {}}
                                            />
                                            <FormField
                                                id="confirm-password"
                                                label="Confirm New Password"
                                                type="password"
                                                value=""
                                                onChange={() => {}}
                                            />
                                        </div>
                                        <div>
                                            <Button type="button" className="bg-[#3CCBC9]">
                                                Update Password
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <h3 className="font-medium text-gray-800 flex items-center mb-4">
                                            <Shield size={16} className="mr-2 text-[#3CCBC9]" />
                                            Connected Accounts
                                        </h3>
                                        <div className="space-y-4">
                                            {securityConnectedAccounts.map((account) => (
                                                <ConnectedAccount key={account.id} account={account} />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </MotionCard>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}