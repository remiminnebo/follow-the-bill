import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    company: [
        { name: "About", href: "/about" },
        { name: "Strategy", href: "/strategy" },
        { name: "Contact", href: "/contact" },
    ],
    resources: [
        { name: "Reports", href: "/reports" },
        { name: "Forum", href: "/forum" },
        { name: "FAQ", href: "/faq" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Disclaimer", href: "/disclaimer" },
    ],
};

const socialLinks = [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "GitHub", href: "https://github.com", icon: Github },
];

export function Footer() {
    return (
        <footer className="border-t-2 border-black bg-white">
            <div className="section-container py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center no-underline mb-4">
                            <Image
                                src="/logo.png"
                                alt="Follow The Bill"
                                width={576}
                                height={295}
                                className="h-10 w-auto"
                                unoptimized
                            />
                        </Link>
                        <p className="font-sans text-sm text-black/60 max-w-sm mb-6">
                            Track AI ecosystem investments from top-level companies down to
                            fundamental resources. Strategic investment insights for the modern
                            investor.
                        </p>

                        {/* Newsletter Signup */}
                        <div className="border-2 border-black p-4">
                            <h4 className="font-serif text-lg font-bold mb-2">
                                Subscribe to Updates
                            </h4>
                            <div className="flex gap-0">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 border-2 border-black border-r-0 px-3 py-2 font-sans text-sm focus:outline-none"
                                />
                                <button className="bg-black text-white px-4 py-2 font-sans text-sm font-medium border-2 border-black hover:bg-white hover:text-black transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-4 border-b-2 border-black pb-2">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-sm text-black hover:text-black/60 no-underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-4 border-b-2 border-black pb-2">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-sm text-black hover:text-black/60 no-underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-4 border-b-2 border-black pb-2">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-sm text-black hover:text-black/60 no-underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t-2 border-black mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-sm text-black/60">
                        © {new Date().getFullYear()} Follow The Bill. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:text-black/60 transition-colors"
                            >
                                <social.icon className="h-5 w-5" />
                                <span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
