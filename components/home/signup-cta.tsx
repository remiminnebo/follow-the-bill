"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SignUpCTA() {
    return (
        <Link href="/sign-up">
            <Button className="bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-colors rounded-none font-sans text-lg px-8 py-6">
                Create Free Account
            </Button>
        </Link>
    );
}
