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
                            className="border-2 border-black"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-full max-w-sm border-l-2 border-black bg-white"
                    >
                        <SheetTitle className="font-serif text-2xl font-bold border-b-2 border-black pb-4">
                            Menu
                        </SheetTitle>
                        <div className="flex flex-col gap-6 mt-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-sans text-lg font-medium text-black hover:text-black/60 no-underline transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t-2 border-black pt-6 mt-4 flex flex-col gap-4">
                                <SignedOut>
                                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                                        <Button
                                            variant="ghost"
                                            className="w-full font-sans border-2 border-black hover:bg-black hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full font-sans bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex flex-col items-center gap-4">
                                        <span className="font-sans text-lg font-medium">
                                            {user?.fullName || user?.username}
                                        </span>
                                        <UserButton
                                            afterSignOutUrl="/"
                                            showName={false}
                                            appearance={{
                                                elements: {
                                                    avatarBox: "h-16 w-16 border-2 border-black",
                                                },
                                            }}
                                        />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
