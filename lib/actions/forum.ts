"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Category } from "@prisma/client";

/**
 * Ensures a user exists in the local database, synced with Clerk.
 */
async function getOrCreateUser(clerkId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId },
    });

    if (user) return user;

    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("User not found in Clerk");

    return await prisma.user.create({
        data: {
            clerkId,
            email: clerkUser.emailAddresses[0].emailAddress,
            name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
            image: clerkUser.imageUrl,
        },
    });
}

export async function createPost(formData: FormData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("You must be logged in to create a post.");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as Category;

    if (!title || !content || !category) {
        throw new Error("Title, content, and category are required.");
    }

    const user = await getOrCreateUser(userId);

    await prisma.post.create({
        data: {
            title,
            content,
            category,
            authorId: user.id,
        },
    });

    revalidatePath("/forum");
}

export async function getPosts(category?: string) {
    return await prisma.post.findMany({
        where: category && category !== "all" ? { category: category as Category } : {},
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
            comments: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
}

export async function createComment(formData: FormData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("You must be logged in to comment.");
    }

    const postId = formData.get("postId") as string;
    const content = formData.get("content") as string;

    if (!postId || !content) {
        throw new Error("Post ID and content are required.");
    }

    const user = await getOrCreateUser(userId);

    await prisma.comment.create({
        data: {
            content,
            postId,
            authorId: user.id,
        },
    });

    revalidatePath(`/forum/thread/${postId}`);
}
