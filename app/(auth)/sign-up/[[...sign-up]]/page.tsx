import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="w-full">
            <h1 className="font-serif text-3xl font-bold mb-2">Create Account</h1>
            <p className="font-sans text-black/60 mb-8">
                Join the community of strategic investors.
            </p>

            <SignUp
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 p-0 w-full bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-2 border-black rounded-none h-12 hover:bg-black hover:text-white transition-colors",
                        socialButtonsBlockButtonText: "font-sans font-medium",
                        dividerLine: "bg-black h-[2px]",
                        dividerText: "font-sans text-black font-bold uppercase tracking-wider",
                        formButtonPrimary: "bg-black rounded-none h-12 font-sans font-bold hover:bg-white hover:text-black border-2 border-black transition-colors",
                        formFieldLabel: "font-sans font-bold text-black uppercase tracking-tight",
                        formFieldInput: "border-2 border-black rounded-none h-12 font-sans",
                        footer: "hidden",
                        identityPreviewText: "font-sans text-black",
                        identityPreviewEditButtonIcon: "text-black",
                    },
                    layout: {
                        shimmer: false,
                    }
                }}
            />

            <div className="mt-8 pt-8 border-t-2 border-black/10">
                <p className="font-sans text-sm text-black/60 text-center">
                    Already have an account?{" "}
                    <a href="/sign-in" className="text-black font-bold hover:underline">
                        Sign in instead
                    </a>
                </p>
            </div>
        </div>
    );
}
