"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";

const navigation = [
    { name: "Strategy", href: "/strategy" },
    { name: "Performance", href: "/performance" },
    { name: "Reports", href: "/reports" },
    { name: "Forum", href: "/forum" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user } = useUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white">
            <nav className="section-container flex items-center justify-between py-2">
                {/* Logo */}
                <Link href="/" className="flex items-center no-underline">
                    <Image
                        src="/logo.png"
                        alt="Follow The Bill"
                        width={576}
                        height={295}
                        className="h-20 w-auto"
                        priority
                        unoptimized
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="font-sans text-sm font-medium text-black hover:text-black/60 no-underline transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedOut>
                        <Link href="/sign-in">
                            <Button
                                variant="ghost"
                                className="font-sans border-2 border-black hover:bg-black hover:text-white transition-colors"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="font-sans bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors">
                                Sign Up
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center gap-3">
                            <span className="font-sans text-sm font-medium">
                                {user?.fullName || user?.username}
                            </span>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "h-10 w-10 border-2 border-black",
                                    },
                                }}
                            />
                        </div>
                    </SignedIn>
                </div>

                {/* Mobile Menu */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="border-2 border-black rounded-none h-12 w-12 hover:bg-black hover:text-white transition-colors group"
                        >
                            <div className="flex flex-col gap-1.5 justify-center items-center">
                                <div className="h-1 w-6 bg-current transition-all group-hover:bg-white" />
                                <div className="h-1 w-6 bg-current transition-all group-hover:bg-white" />
                            </div>
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="top"
                        className="w-full h-full border-none bg-white p-0 flex flex-col"
                    >
                        {/* Custom Close Button - handled by Sheet internally but we can style if needed, 
                            default Radix Close is fine, but lets make sure the Content area is immersive */}
                        <div className="flex-1 flex flex-col pt-24 pb-12 px-8 overflow-y-auto">
                            <div className="mb-12">
                                <p className="font-serif text-[10px] uppercase tracking-widest font-bold mb-4 opacity-40">
                                    Navigation
                                </p>
                                <div className="flex flex-col gap-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="font-serif text-5xl font-black text-black no-underline hover:italic transition-all border-b-4 border-black pb-2 w-fit pr-8"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto space-y-8">
                                <div className="flex flex-col gap-4">
                                    <SignedOut>
                                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                                            <Button
                                                variant="outline"
                                                className="w-full h-16 font-sans text-xl font-bold border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full h-16 font-sans text-xl font-bold bg-black text-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </SignedOut>
                                    <SignedIn>
                                        <div className="border-4 border-black p-6 flex items-center justify-between">
                                            <div>
                                                <p className="font-sans text-sm opacity-40 uppercase font-bold tracking-tighter">Authenticated As</p>
                                                <p className="font-serif text-2xl font-black">{user?.fullName || user?.username}</p>
                                            </div>
                                            <UserButton
                                                afterSignOutUrl="/"
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "h-16 w-16 border-4 border-black",
                                                    },
                                                }}
                                            />
                                        </div>
                                    </SignedIn>
                                </div>

                                <div className="pt-8 border-t-2 border-black/10">
                                    <p className="font-sans text-sm text-black/60 leading-relaxed italic">
                                        “Follow The Bill” is a methodology for understanding investment
                                        opportunities by tracing capital flows through the AI ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
