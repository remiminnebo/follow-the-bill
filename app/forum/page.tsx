import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { SignUpCTA } from "@/components/home";
import { Card, CardContent } from "@/components/ui/card";
import {
    TrendingUp,
    MessageSquare,
    BookOpen,
    MessageCircle,
    ChevronRight,
    Users,
} from "lucide-react";
import { CreatePostForm } from "@/components/forum/create-post-form";
import { PostList } from "@/components/forum/post-list";
import { SignedIn } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Forum",
    description:
        "“Follow The Bill” is a methodology for understanding investment opportunities by tracing capital flows through the AI ecosystem. When billions flow into AI development, we ask: where does that money ultimately go?",
};

const categories = [
    {
        id: "MARKET_ANALYSIS",
        name: "Market Analysis",
        description: "Discuss market trends, earnings, and investment opportunities",
        icon: TrendingUp,
    },
    {
        id: "STRATEGY",
        name: "Strategy Discussion",
        description: "Deep dives into investment strategies and methodologies",
        icon: MessageSquare,
    },
    {
        id: "RESOURCES",
        name: "Resources",
        description: "Share and discover educational materials and research",
        icon: BookOpen,
    },
    {
        id: "GENERAL",
        name: "General",
        description: "Off-topic discussions and community announcements",
        icon: MessageCircle,
    },
];

export default async function ForumPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[96px]">
                {/* Hero */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-20">
                        <div className="max-w-4xl">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                                Community Forum
                            </h1>
                            <p className="font-sans text-xl text-black/80">
                                Join discussions with strategic investors tracking the AI
                                ecosystem. Share insights, ask questions, and learn from the
                                community.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-12 md:py-16">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">
                            Categories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {categories.map((cat, index) => (
                                <Link
                                    key={cat.id}
                                    href={`/forum?category=${cat.id}`}
                                    className="no-underline"
                                >
                                    <Card
                                        className={`border-2 border-black rounded-none shadow-none hover:bg-black hover:text-white transition-colors group h-full ${index < 2 ? "border-b-0 md:border-b-2" : ""
                                            } ${index % 2 === 0 ? "md:border-r-0" : ""} ${category === cat.id ? "bg-black text-white" : ""}`}
                                    >
                                        <CardContent className="p-6 flex items-start gap-4">
                                            <div className="border-2 border-current p-3 shrink-0">
                                                <cat.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-xl font-bold mb-1">
                                                    {cat.name}
                                                </h3>
                                                <p className="font-sans text-sm opacity-60">
                                                    {cat.description}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Threads */}
                <section>
                    <div className="section-container py-12 md:py-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold">
                                {category ? `Discussions in ${category.replace("_", " ").toLowerCase()}` : "Recent Discussions"}
                            </h2>
                            <div className="flex items-center gap-4">
                                <SignedIn>
                                    <CreatePostForm />
                                </SignedIn>
                                <Link
                                    href="/forum"
                                    className="font-sans text-sm font-medium text-black hover:text-black/60 no-underline"
                                >
                                    View All →
                                </Link>
                            </div>
                        </div>

                        <PostList category={category} />
                    </div>
                </section>

                {/* Join CTA */}
                <section className="border-t-2 border-black bg-black text-white">
                    <div className="section-container py-16 text-center">
                        <Users className="h-12 w-12 mx-auto mb-4" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                            Join the Discussion
                        </h2>
                        <p className="font-sans text-white/80 mb-6 max-w-xl mx-auto">
                            Create an account to participate in discussions, upvote posts, and
                            connect with other strategic investors.
                        </p>
                        <SignUpCTA />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
