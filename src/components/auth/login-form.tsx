"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
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

    if (checkingSession) return null; // Prevent showing form while checking

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="bg-white border-slate-200 text-black"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
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
                    className="bg-white border-slate-200 text-black"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white"
                disabled={loading}
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                    <>
                        Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>

            <div className="text-center text-sm">
                <span className="text-slate-600">Don't have an account?</span>{" "}
                <Link
                    href="/register"
                    className="text-teal-600 hover:underline font-medium"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
}
