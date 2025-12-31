import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left/Content Side */}
            <div className="flex-1 flex flex-col">
                <div className="p-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-sans text-sm text-black/60 hover:text-black no-underline group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to home
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 pt-0 md:pt-8">
                    <div className="w-full max-w-[400px]">
                        {/* Logo */}
                        <Link href="/" className="inline-block mb-12">
                            <Image
                                src="/logo.png"
                                alt="Follow The Bill"
                                width={576}
                                height={295}
                                className="h-16 w-auto"
                                unoptimized
                            />
                        </Link>
                        {children}
                    </div>
                </div>
            </div>

            {/* Right Side - Decorative (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 bg-black text-white p-12 lg:p-24 items-center justify-center relative overflow-hidden">
                {/* Decorative Pattern / Design */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                        Follow the money from AI to atoms.
                    </h2>
                    <div className="space-y-6">
                        <p className="font-sans text-lg text-white/80 border-l-2 border-white pl-6 py-2">
                            Access exclusive research reports tracking the AI supply chain.
                        </p>
                        <p className="font-sans text-lg text-white/80 border-l-2 border-white pl-6 py-2">
                            Join discussions with a community of strategic investors.
                        </p>
                        <p className="font-sans text-lg text-white/80 border-l-2 border-white pl-6 py-2">
                            Get real-time insights into energy and infrastructure markets.
                        </p>
                    </div>
                </div>

                {/* Bottom Badge */}
                <div className="absolute bottom-12 right-12 border-2 border-white p-4 font-serif font-bold text-xl">
                    STRATEGY FIRST
                </div>
            </div>
        </div>
    );
}
