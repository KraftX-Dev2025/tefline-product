"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
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
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                    emailRedirectTo: `${window.location.origin}/profile`,
                },
            });
            setSuccess(true);
            if (error) {
                setError(error.message);
                return;
            }

        } catch (err) {
            console.error("Registration error:", err);
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/profile`,
                },
            });

            if (error) {
                throw error;
            }

            setSuccess(true);
        } catch (error: any) {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            setError(error.message || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="p-6 bg-teal-50 border border-teal-200 rounded-lg text-center">
                <h3 className="text-lg font-medium text-teal-700 mb-2">
                    Registration Successful!
                </h3>
                <p className="text-teal-600 mb-4">
                    Please check your email for confirmation instructions.
                </p>
                <Button
                    onClick={() => router.push("/login")}
                    className="bg-teal-600 hover:bg-teal-700"
                >
                    Go to Login
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="bg-white border-slate-200 "
                />
            </div>

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
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-white border-slate-200 text-black"
                />
                <p className="text-xs text-slate-500">
                    Must be at least 6 characters
                </p>
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
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>

        </form>
    );
}
