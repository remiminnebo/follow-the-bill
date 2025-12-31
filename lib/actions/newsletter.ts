"use server";

import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get("email") as string;

    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
        return {
            error: result.error.errors[0].message,
        };
    }

    try {
        const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
            where: {
                email: result.data.email,
            },
        });

        if (existingSubscriber) {
            if (!existingSubscriber.isActive) {
                // Reactivate if previously unsubscribed
                await prisma.newsletterSubscriber.update({
                    where: { id: existingSubscriber.id },
                    data: { isActive: true },
                });
                return {
                    success: true,
                    message: "Welcome back! You've been resubscribed.",
                };
            }
            return {
                error: "This email is already subscribed.",
            };
        }

        await prisma.newsletterSubscriber.create({
            data: {
                email: result.data.email,
            },
        });

        revalidatePath("/");
        return {
            success: true,
            message: "Successfully subscribed!",
        };
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return {
            error: "Something went wrong. Please try again later.",
        };
    }
}
