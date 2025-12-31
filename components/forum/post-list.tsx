import Link from "next/link";
import { MessageCircle, User } from "lucide-react";
import { getPosts } from "@/lib/actions/forum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function PostList({ category }: { category?: string }) {
    const posts = await getPosts(category);

    if (posts.length === 0) {
        return (
            <div className="border-2 border-black p-12 text-center bg-gray-50">
                <p className="font-sans text-lg text-black/60 italic">
                    No discussions found in this category. Be the first to start one!
                </p>
            </div>
        );
    }

    return (
        <div className="border-2 border-black divide-y-2 divide-black">
            {posts.map((post: any) => (
                <Link
                    key={post.id}
                    href={`/forum/thread/${post.id}`}
                    className="no-underline block"
                >
                    <div className="p-4 md:p-6 hover:bg-black hover:text-white transition-colors group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="font-sans text-base md:text-lg font-bold mb-2 group-hover:text-white">
                                    {post.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 md:gap-4 font-sans text-xs opacity-60">
                                    <div className="flex items-center gap-1">
                                        <Avatar className="h-4 w-4 border border-current">
                                            <AvatarImage src={post.author.image || undefined} />
                                            <AvatarFallback className="bg-transparent">
                                                <User className="h-3 w-3" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>@{post.author.name || "anonymous"}</span>
                                    </div>
                                    <span>•</span>
                                    <span className="uppercase tracking-tighter bg-current/10 px-1">{post.category.replace("_", " ")}</span>
                                    <span>•</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <MessageCircle className="h-4 w-4 opacity-60" />
                                <span className="font-sans text-sm font-bold">
                                    {post._count.comments}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
