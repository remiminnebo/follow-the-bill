import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText } from "lucide-react";

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
    return (
        <Card className="border-2 border-black bg-white rounded-none shadow-none hover:bg-black hover:text-white transition-colors group h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-current opacity-60 group-hover:opacity-80">
                        <Calendar className="h-4 w-4" />
                        <span className="font-sans text-sm">{report.publishedAt}</span>
                    </div>
                    {report.isFree ? (
                        <Badge
                            variant="outline"
                            className="font-sans text-xs border-current rounded-none"
                        >
                            Free
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="font-sans text-xs border-current rounded-none"
                        >
                            Subscriber
                        </Badge>
                    )}
                </div>
                <CardTitle className="font-serif text-xl font-bold leading-tight">
                    {report.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
                <p className="font-sans text-sm opacity-80 mb-4 flex-1 line-clamp-3">
                    {report.description}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                    <span className="font-sans text-xs border border-current px-2 py-1">
                        {report.category}
                    </span>
                </div>
                <div className="mt-4 pt-4 border-t border-current/20">
                    <a href={report.fileUrl} download className="block">
                        <Button
                            variant="outline"
                            className="w-full font-sans border-2 border-current bg-transparent hover:bg-white hover:text-black group-hover:border-white transition-colors rounded-none"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                        </Button>
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
