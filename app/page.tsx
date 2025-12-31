import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { InvestmentFlow, NewsletterSignup, LatestReport, SignUpCTA } from "@/components/home";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-[96px]">
        {/* Hero Section */}
        <section className="border-b-2 border-black">
          <div className="section-container py-16 md:py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <Image
                  src="/landing.png"
                  alt="Follow The Bill Logo"
                  width={576}
                  height={218}
                  className="w-full max-w-[400px] h-auto"
                  priority
                  unoptimized
                />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Follow The Bill
              </h1>
              <p className="font-sans text-xl md:text-2xl text-black/80 mb-8 leading-relaxed">
                Track AI ecosystem investments from top-level companies down to
                fundamental resources. Understand where the money flows—from
                artificial intelligence to uranium mining.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/strategy">
                  <Button className="w-full sm:w-auto bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none font-sans text-lg px-8 py-6">
                    Learn Our Strategy
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none font-sans text-lg px-8 py-6"
                  >
                    View Reports
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="border-b-2 border-black bg-black text-white">
          <div className="section-container py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x-2 divide-white/20">
              <div className="p-8 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">
                  Strategic Analysis
                </h3>
                <p className="font-sans text-sm text-white/80">
                  Deep-dive research into the full AI investment supply chain
                </p>
              </div>
              <div className="p-8 text-center">
                <Shield className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">
                  Independent Research
                </h3>
                <p className="font-sans text-sm text-white/80">
                  Non-profit, unbiased analysis without conflicts of interest
                </p>
              </div>
              <div className="p-8 text-center">
                <Users className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">
                  Community Driven
                </h3>
                <p className="font-sans text-sm text-white/80">
                  Join discussions with like-minded strategic investors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Flow Diagram */}
        <section className="border-b-2 border-black">
          <div className="section-container py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                The Investment Chain
              </h2>
              <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                Understanding how capital flows through the AI ecosystem—from
                tech giants to the fundamental resources that power them.
              </p>
            </div>
            <InvestmentFlow />
          </div>
        </section>

        {/* Latest Report */}
        <section className="border-b-2 border-black">
          <div className="section-container py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Latest Report
              </h2>
              <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                Our most recent analysis of AI ecosystem investments.
              </p>
            </div>
            <LatestReport />
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="border-b-2 border-black bg-white">
          <div className="section-container py-16 md:py-24">
            <NewsletterSignup />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white">
          <div className="section-container py-16 md:py-24 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Follow The Bill?
            </h2>
            <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join our community of strategic investors and gain access to
              exclusive research, monthly reports, and discussion forums.
            </p>
            <SignUpCTA />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
