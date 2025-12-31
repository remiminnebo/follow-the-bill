import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { SignUpCTA } from "@/components/home";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    MessageSquare,
    BookOpen,
    MessageCircle,
    ChevronRight,
    Users,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Forum",
    description:
        "Join discussions with strategic investors. Share insights on AI investments, energy markets, and supply chain analysis.",
};

const categories = [
    {
        id: "market-analysis",
        name: "Market Analysis",
        description: "Discuss market trends, earnings, and investment opportunities",
        icon: TrendingUp,
        threadCount: 124,
        postCount: 892,
    },
    {
        id: "strategy",
        name: "Strategy Discussion",
        description: "Deep dives into investment strategies and methodologies",
        icon: MessageSquare,
        threadCount: 87,
        postCount: 543,
    },
    {
        id: "resources",
        name: "Resources",
        description: "Share and discover educational materials and research",
        icon: BookOpen,
        threadCount: 56,
        postCount: 234,
    },
    {
        id: "general",
        name: "General",
        description: "Off-topic discussions and community announcements",
        icon: MessageCircle,
        threadCount: 203,
        postCount: 1420,
    },
];

const recentThreads = [
    {
        id: "1",
        title: "NVIDIA Q4 earnings analysis and supply chain implications",
        author: "strategyMaster",
        category: "Market Analysis",
        replies: 47,
        timestamp: "2 hours ago",
    },
    {
        id: "2",
        title: "Nuclear power deals: Constellation vs Vistra deep dive",
        author: "powerTrader",
        category: "Strategy Discussion",
        replies: 32,
        timestamp: "5 hours ago",
    },
    {
        id: "3",
        title: "Understanding TSMC's advanced packaging capacity constraints",
        author: "chipWatcher",
        category: "Resources",
        replies: 18,
        timestamp: "8 hours ago",
    },
    {
        id: "4",
        title: "Uranium spot prices hitting 17-year highs - what comes next?",
        author: "atomicInvestor",
        category: "Market Analysis",
        replies: 65,
        timestamp: "12 hours ago",
    },
];

export default function ForumPage() {
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

                {/* Stats Bar */}
                <section className="border-b-2 border-black bg-black text-white">
                    <div className="section-container py-6">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            <div className="text-center">
                                <p className="font-serif text-3xl font-bold">470</p>
                                <p className="font-sans text-sm text-white/60">Threads</p>
                            </div>
                            <div className="text-center">
                                <p className="font-serif text-3xl font-bold">3,089</p>
                                <p className="font-sans text-sm text-white/60">Posts</p>
                            </div>
                            <div className="text-center">
                                <p className="font-serif text-3xl font-bold">1,247</p>
                                <p className="font-sans text-sm text-white/60">Members</p>
                            </div>
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
                            {categories.map((category, index) => (
                                <Link
                                    key={category.id}
                                    href={`/forum/${category.id}`}
                                    className="no-underline"
                                >
                                    <Card
                                        className={`border-2 border-black rounded-none shadow-none hover:bg-black hover:text-white transition-colors group h-full ${index < 2 ? "border-b-0 md:border-b-2" : ""
                                            } ${index % 2 === 0 ? "md:border-r-0" : ""}`}
                                    >
                                        <CardContent className="p-6 flex items-start gap-4">
                                            <div className="border-2 border-current p-3 shrink-0">
                                                <category.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-xl font-bold mb-1">
                                                    {category.name}
                                                </h3>
                                                <p className="font-sans text-sm opacity-60 mb-3">
                                                    {category.description}
                                                </p>
                                                <div className="flex gap-4 font-sans text-xs">
                                                    <span>{category.threadCount} threads</span>
                                                    <span>{category.postCount} posts</span>
                                                </div>
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
                                Recent Discussions
                            </h2>
                            <Link
                                href="/forum/all"
                                className="font-sans text-sm font-medium text-black hover:text-black/60 no-underline"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="border-2 border-black divide-y-2 divide-black">
                            {recentThreads.map((thread) => (
                                <Link
                                    key={thread.id}
                                    href={`/forum/thread/${thread.id}`}
                                    className="no-underline"
                                >
                                    <div className="p-4 md:p-6 hover:bg-black hover:text-white transition-colors group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-sans text-base md:text-lg font-medium mb-2 group-hover:text-white">
                                                    {thread.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 md:gap-4 font-sans text-xs opacity-60">
                                                    <span>@{thread.author}</span>
                                                    <span>•</span>
                                                    <span>{thread.category}</span>
                                                    <span>•</span>
                                                    <span>{thread.timestamp}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <MessageCircle className="h-4 w-4 opacity-60" />
                                                <span className="font-sans text-sm">{thread.replies}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
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
