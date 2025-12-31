import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowRight } from "lucide-react";
import { getReports } from "@/lib/actions/reports";

export async function LatestReport() {
    const reports = await getReports();
    const latestReport = reports[0];

    if (!latestReport) return null;

    const formattedDate = new Date(latestReport.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
                        <a href={latestReport.fileUrl} download>
                            <Button className="w-full sm:w-auto bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none font-sans">
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                            </Button>
                        </a>
                        <Link href="/reports">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none font-sans"
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
