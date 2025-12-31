"use server";

import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { resend } from "@/lib/resend";
import { WelcomeEmail } from "@/components/emails/welcome-template";
import { promises as fs } from 'fs';
import path from 'path';

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get("email") as string;

    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
        return {
            error: result.error.issues[0].message,
        };
    }

    try {
        const pdfPath = path.join(process.cwd(), 'public', 'reports', 'FTB_December2025.pdf');
        const pdfContent = await fs.readFile(pdfPath);
        const attachments = [
            {
                filename: 'FTB_December2025.pdf',
                content: pdfContent,
            },
        ];

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
                    subject: 'Welcome back + December Report',
                    react: WelcomeEmail({ email: result.data.email }),
                    attachments,
                });

                return {
                    success: true,
                    message: "Welcome back! You've been resubscribed and the report is on its way.",
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
            subject: 'Welcome to Follow The Bill + December Report',
            react: WelcomeEmail({ email: result.data.email }),
            attachments,
        });

        revalidatePath("/");
        return {
            success: true,
            message: "Successfully subscribed! Check your email for the December report.",
        };
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return {
            error: "Something went wrong. Please try again later.",
        };
    }
}
