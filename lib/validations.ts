import { z } from "zod";

// Auth validations
export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

// Forum validations
export const createPostSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(200, "Title must be less than 200 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    category: z.enum(["MARKET_ANALYSIS", "STRATEGY", "RESOURCES", "GENERAL"]),
});

export const createCommentSchema = z.object({
    content: z
        .string()
        .min(3, "Comment must be at least 3 characters")
        .max(5000, "Comment must be less than 5000 characters"),
    postId: z.string().cuid(),
    parentId: z.string().cuid().optional(),
});

// Newsletter validation
export const newsletterSchema = z.object({
    email: z.string().email("Please enter a valid email"),
});

// Report validation
export const createReportSchema = z.object({
    title: z.string().min(5, "Title is required"),
    description: z.string().min(20, "Description is required"),
    category: z.string().min(1, "Category is required"),
    isFree: z.boolean(),
    publishedAt: z.string().datetime(),
});

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
