import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowRight, Lock } from "lucide-react";
import { getReports } from "@/lib/actions/reports";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";

export async function LatestReport() {
    const reports = await getReports();
    const latestReport = reports[0];

    if (!latestReport) return null;

    const formattedDate = new Date(latestReport.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const DownloadBtn = (
        <Button className="w-full sm:w-auto bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none font-sans h-12 px-8">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
        </Button>
    );

    return (
        <div className="w-full max-w-3xl mx-auto">
            <Card className="border-2 border-black bg-white rounded-none shadow-none">
                <CardHeader className="border-b-2 border-black pb-4">
                    <div className="flex items-center gap-2 text-black/60 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-sans text-sm">{formattedDate}</span>
                    </div>
                    <CardTitle className="font-serif text-2xl md:text-3xl font-bold">
                        {latestReport.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="font-sans text-black/80 mb-6 leading-relaxed">
                        {latestReport.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <SignedIn>
                            <a href={latestReport.fileUrl} download>
                                {DownloadBtn}
                            </a>
                        </SignedIn>
                        <SignedOut>
                            <Dialog>
                                <DialogTrigger asChild>
                                    {DownloadBtn}
                                </DialogTrigger>
                                <DialogContent className="border-2 border-black rounded-none bg-white p-0 sm:max-w-[400px]">
                                    <DialogHeader className="p-8 text-center bg-black text-white uppercase tracking-tighter">
                                        <div className="mx-auto bg-white/20 p-4 rounded-full w-fit mb-4">
                                            <Lock className="h-8 w-8 text-white" />
                                        </div>
                                        <DialogTitle className="font-serif text-2xl font-bold mb-2">
                                            Authentication Required
                                        </DialogTitle>
                                        <DialogDescription className="text-white/60 font-sans">
                                            Please join Follow The Bill to access our free methodology reports.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="p-8 space-y-4">
                                        <p className="font-sans text-center text-black/80">
                                            We ask all readers to create a free account to download our latest research. This helps us share updates on our AI investment tracking.
                                        </p>
                                        <Link href="/sign-up" className="block no-underline">
                                            <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-12 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0">
                                                Create Free Account
                                            </Button>
                                        </Link>
                                        <p className="text-[10px] text-center text-black/40 uppercase font-bold tracking-widest">
                                            Join 5,000+ Strategic Investors
                                        </p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </SignedOut>

                        <Link href="/reports">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none font-sans h-12 px-8"
                            >
                                View All Reports
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
