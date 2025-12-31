import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Follow The Bill | Strategic Investment Tracking",
    template: "%s | Follow The Bill",
  },
  description:
    "Track AI ecosystem investments from top-level companies down to fundamental resources like uranium mining and power generation. Strategic investment insights for the modern investor.",
  keywords: [
    "AI investments",
    "investment tracking",
    "uranium mining",
    "power generation",
    "semiconductor investments",
    "infrastructure investing",
    "strategic investing",
  ],
  authors: [{ name: "Follow The Bill" }],
  openGraph: {
    title: "Follow The Bill | Strategic Investment Tracking",
    description:
      "Track AI ecosystem investments from top-level companies down to fundamental resources.",
    url: "https://followthebill.com",
    siteName: "Follow The Bill",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Follow The Bill | Strategic Investment Tracking",
    description:
      "Track AI ecosystem investments from top-level companies down to fundamental resources.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
        <body className="font-sans antialiased bg-white text-black min-h-screen">
          {children}
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
