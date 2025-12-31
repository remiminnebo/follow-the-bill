"use server";

import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { resend } from "@/lib/resend";
import { WelcomeEmail } from "@/components/emails/welcome-template";

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

                // Send welcome email (again)
                await resend.emails.send({
                    from: 'Follow The Bill <onboarding@resend.dev>', // Update this with your verified domain
                    to: result.data.email,
                    subject: 'Welcome back to Follow The Bill',
                    react: WelcomeEmail({ email: result.data.email }),
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

        // Send welcome email
        await resend.emails.send({
            from: 'Follow The Bill <onboarding@resend.dev>', // Update this with your verified domain
            to: result.data.email,
            subject: 'Welcome to Follow The Bill',
            react: WelcomeEmail({ email: result.data.email }),
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
