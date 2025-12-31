"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Lock, UserPlus } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";

interface Report {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    category: string;
    fileUrl: string;
    isFree: boolean;
}

interface ReportCardProps {
    report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
    const DownloadButton = (
        <Button
            variant="outline"
            className="w-full font-sans border-2 border-current bg-transparent hover:bg-white hover:text-black group-hover:border-white transition-colors rounded-none h-12"
        >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
        </Button>
    );

    return (
        <Card className="border-2 border-black bg-white rounded-none shadow-none hover:bg-black hover:text-white transition-colors group h-full flex flex-col">
            <CardHeader className="pb-3 text-inherit">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-current opacity-60 group-hover:opacity-80">
                        <Calendar className="h-4 w-4" />
                        <span className="font-sans text-sm">{report.publishedAt}</span>
                    </div>
                    <Badge
                        variant="outline"
                        className={`font-sans text-xs border-current rounded-none ${report.isFree ? "" : "bg-black text-white group-hover:bg-white group-hover:text-black"
                            }`}
                    >
                        {report.isFree ? "Free" : "Subscriber"}
                    </Badge>
                </div>
                <CardTitle className="font-serif text-xl font-bold leading-tight">
                    {report.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 text-inherit">
                <p className="font-sans text-sm opacity-80 mb-4 flex-1 line-clamp-3">
                    {report.description}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                    <span className="font-sans text-[10px] uppercase font-bold tracking-tight border border-current px-2 py-1">
                        {report.category}
                    </span>
                </div>
                <div className="mt-6 pt-4 border-t border-current/20">
                    <SignedIn>
                        {report.isFree ? (
                            <a href={report.fileUrl} download className="block no-underline">
                                {DownloadButton}
                            </a>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    {DownloadButton}
                                </DialogTrigger>
                                <DialogContent className="border-2 border-black rounded-none bg-white p-0 sm:max-w-[400px]">
                                    <DialogHeader className="p-8 text-center bg-black text-white">
                                        <div className="mx-auto bg-white/20 p-4 rounded-full w-fit mb-4">
                                            <Lock className="h-8 w-8 text-white" />
                                        </div>
                                        <DialogTitle className="font-serif text-2xl font-bold mb-2">
                                            Subscription Required
                                        </DialogTitle>
                                        <DialogDescription className="text-white/60 font-sans">
                                            Archive access is reserved for subscribers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="p-8 space-y-4">
                                        <p className="font-sans text-center text-black/80">
                                            Historical research is part of our premium archival research. Join our subscription plan to unlock full access.
                                        </p>
                                        <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-12 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0">
                                            Subscribe Now
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </SignedIn>
                    <SignedOut>
                        <Dialog>
                            <DialogTrigger asChild>
                                {DownloadButton}
                            </DialogTrigger>
                            <DialogContent className="border-2 border-black rounded-none bg-white p-0 sm:max-w-[400px]">
                                <DialogHeader className="p-8 text-center bg-black text-white">
                                    <div className="mx-auto bg-white/20 p-4 rounded-full w-fit mb-4">
                                        <UserPlus className="h-8 w-8 text-white" />
                                    </div>
                                    <DialogTitle className="font-serif text-2xl font-bold mb-2">
                                        {report.isFree ? "Free Download" : "Restricted Access"}
                                    </DialogTitle>
                                    <DialogDescription className="text-white/60 font-sans">
                                        {report.isFree
                                            ? "Create a free account to unlock this report."
                                            : "This report requires a premium subscription."}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="p-8 space-y-4">
                                    <p className="font-sans text-center text-black/80">
                                        Join our community of strategic investors to access exclusive reports and research.
                                    </p>
                                    <Link href="/sign-up" className="block no-underline">
                                        <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-12 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0">
                                            Sign Up for Free
                                        </Button>
                                    </Link>
                                    {!report.isFree && (
                                        <p className="text-[10px] text-center text-black/40 uppercase font-bold mt-2">
                                            Archival reports require a paid subscription
                                        </p>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </SignedOut>
                </div>
            </CardContent>
        </Card>
    );
}
