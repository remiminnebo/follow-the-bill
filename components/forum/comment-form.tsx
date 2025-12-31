"use client";

import { useFormStatus } from "react-dom";
import { createComment } from "@/lib/actions/forum";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors rounded-none font-sans font-bold"
        >
            {pending ? "Posting..." : "Post Comment"}
        </Button>
    );
}

export function CommentForm({ postId }: { postId: string }) {
    const formRef = useRef<HTMLFormElement>(null);

    async function action(formData: FormData) {
        try {
            await createComment(formData);
            formRef.current?.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to post comment.");
        }
    }

    return (
        <form ref={formRef} action={action} className="space-y-4">
            <input type="hidden" name="postId" value={postId} />
            <Textarea
                name="content"
                placeholder="Add to the discussion..."
                required
                className="border-2 border-black rounded-none min-h-[100px] font-sans"
            />
            <div className="flex justify-end">
                <SubmitButton />
            </div>
        </form>
    );
}
