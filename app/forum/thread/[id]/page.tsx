import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { getPost } from "@/lib/actions/forum";
import { CommentForm } from "@/components/forum/comment-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageCircle, ArrowLeft, Clock } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignUpCTA } from "@/components/home";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);

    return {
        title: post?.title || "Discussion",
        description: post?.content.substring(0, 160),
    };
}

export default async function ThreadPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[96px]">
                <section className="border-b-2 border-black">
                    <div className="section-container py-12">
                        <Link
                            href="/forum"
                            className="inline-flex items-center gap-2 font-sans text-sm text-black/60 hover:text-black no-underline mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Forum
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider">
                                    {post.category.replace("_", " ")}
                                </span>
                                <span className="flex items-center gap-1.5 font-sans text-xs text-black/40">
                                    <Clock className="h-3 w-3" />
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-3 pb-8 border-b-2 border-black/10 mb-8">
                                <Avatar className="h-10 w-10 border-2 border-black">
                                    <AvatarImage src={post.author.image || undefined} />
                                    <AvatarFallback className="bg-transparent">
                                        <User className="h-6 w-6" />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-sans font-bold text-sm">@{post.author.name || "anonymous"}</p>
                                    <p className="font-sans text-xs text-black/60">Community Member</p>
                                </div>
                            </div>

                            <div className="font-sans text-lg text-black/80 leading-relaxed whitespace-pre-wrap mb-12">
                                {post.content}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comments Section */}
                <section className="bg-gray-50 flex-1 min-h-[400px]">
                    <div className="section-container py-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-8">
                                <MessageCircle className="h-6 w-6" />
                                <h2 className="font-serif text-2xl font-bold">
                                    Discussion ({post.comments.length})
                                </h2>
                            </div>

                            {/* Comment Input */}
                            <div className="bg-white border-2 border-black p-6 mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <SignedIn>
                                    <CommentForm postId={post.id} />
                                </SignedIn>
                                <SignedOut>
                                    <div className="text-center py-4">
                                        <p className="font-sans text-black/60 mb-4">You must be signed in to join the discussion.</p>
                                        <SignUpCTA />
                                    </div>
                                </SignedOut>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-6">
                                {post.comments.length === 0 ? (
                                    <p className="font-sans text-black/40 italic">No comments yet. Start the conversation.</p>
                                ) : (
                                    post.comments.map((comment) => (
                                        <div key={comment.id} className="bg-white border-2 border-black p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Avatar className="h-6 w-6 border border-black">
                                                    <AvatarImage src={comment.author.image || undefined} />
                                                    <AvatarFallback className="bg-transparent">
                                                        <User className="h-3 w-3" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-sans font-bold text-xs">@{comment.author.name || "anonymous"}</span>
                                                <span className="font-sans text-[10px] text-black/40">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="font-sans text-base text-black/80">
                                                {comment.content}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
