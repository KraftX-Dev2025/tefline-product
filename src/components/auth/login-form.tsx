"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                router.push("/");
            } else {
                setCheckingSession(false);
            }
        };

        checkSession();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.refresh();
            router.push("/onboarding");
        } catch (error: any) {
            setError(error.message || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `/onboarding`,
                },
            });

            if (error) throw error;
        } catch (error: any) {
            setError(
                error.message || "An error occurred during Google sign in"
            );
            setGoogleLoading(false);
        }
    };

    if (checkingSession) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-red-500">!</span>
                    </div>
                    <p>{error}</p>
                </div>
            )}

            {/* Google Sign In Button - Above email/password fields */}
            <Button
                type="button"
                variant="outline"
                className="w-full font-bold flex items-center text-teal-600 hover:bg-teal-600 hover:text-white justify-center h-12"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
            >
                {googleLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                    <>
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                        Continue with Google
                    </>
                )}
            </Button>

            <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-200 w-full"></div>
                <div className="px-3 text-xs font-bold absolute">
                    or Login with Email
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="bg-white border-gray-200 h-12 text-black"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label htmlFor="password" className="text-gray-700">
                        Password
                    </Label>
                    <Link
                        href="/reset-password"
                        className="text-xs text-teal-600 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white border-gray-200 h-12 text-black"
                />
            </div>
            <div className="flex justify-center items-center">
                <Button
                    type="submit"
                    variant="gradient"
                    className="w-auto px-8 hover:from-teal-500 hover:to-teal-700 text-white font-bold h-12"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                        <>
                            Sign In <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                    )}
                </Button>
            </div>
            <div className="text-center flex gap-2 items-center justify-center text-sm">
                <div className="text-teal-600">Don't have an account ?</div>{" "}
                <Link
                    href="/register"
                    className="text-teal-600 flex items-center justify-center hover:underline font-medium"
                >
                    <div>Sign up</div>
                    <div> <ChevronRight className="h-5 w-5 ml-0.5" /></div>
                </Link>
            </div>
        </form>
    );
}
