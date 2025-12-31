"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

export function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", email);

        const result = await subscribeToNewsletter(formData);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message || "Successfully subscribed!", {
                description: "You'll receive our next monthly report in your inbox.",
            });
            setEmail("");
        }

        setIsLoading(false);
    };

    return (
        <div className="border-2 border-black bg-white p-8 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-2 text-center">
                Subscribe to Monthly Insights
            </h3>
            <p className="font-sans text-sm text-black/60 mb-6 text-center">
                Get our exclusive investment reports delivered directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-0">
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 border-2 border-black border-r-0 px-4 py-3 font-sans focus:outline-none focus:ring-0 rounded-none"
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white px-6 py-3 font-sans font-medium border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none disabled:opacity-50"
                >
                    {isLoading ? "..." : "Subscribe"}
                </Button>
            </form>

            <p className="font-sans text-xs text-black/40 mt-4 text-center">
                We respect your privacy. Unsubscribe anytime.
            </p>
        </div>
    );
}
