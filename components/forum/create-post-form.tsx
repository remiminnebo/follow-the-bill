"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createPost } from "@/lib/actions/forum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors rounded-none font-sans font-bold w-full"
        >
            {pending ? "Creating..." : "Create Post"}
        </Button>
    );
}

export function CreatePostForm() {
    const [open, setOpen] = useState(false);

    async function action(formData: FormData) {
        try {
            await createPost(formData);
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert("Failed to create post. Please try again.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors rounded-none font-sans font-bold">
                    <Plus className="h-4 w-4 mr-2" />
                    New Discussion
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-2 border-black rounded-none bg-white p-0">
                <DialogHeader className="p-6 border-b-2 border-black">
                    <DialogTitle className="font-serif text-2xl font-bold">Start a New Discussion</DialogTitle>
                </DialogHeader>
                <form action={action} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-sans font-bold uppercase tracking-tight">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Give your discussion a title"
                            required
                            className="border-2 border-black rounded-none h-12 font-sans"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category" className="font-sans font-bold uppercase tracking-tight">Category</Label>
                        <select
                            id="category"
                            name="category"
                            required
                            className="w-full border-2 border-black rounded-none h-12 font-sans px-3 bg-white focus:outline-none focus:ring-0"
                        >
                            <option value="MARKET_ANALYSIS">Market Analysis</option>
                            <option value="STRATEGY">Strategy</option>
                            <option value="RESOURCES">Resources</option>
                            <option value="GENERAL">General</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content" className="font-sans font-bold uppercase tracking-tight">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="What would you like to discuss?"
                            required
                            className="border-2 border-black rounded-none min-h-[150px] font-sans"
                        />
                    </div>
                    <SubmitButton />
                </form>
            </DialogContent>
        </Dialog>
    );
}
