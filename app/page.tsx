import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { InvestmentFlow, RoboticsInvestmentFlow, NewsletterSignup, LatestReport, SignUpCTA } from "@/components/home";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Users, Brain, Bot } from "lucide-react";

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
                  src="/lander.webp"
                  alt="Follow The Bill Lander"
                  width={576}
                  height={218}
                  className="w-full max-w-[500px] h-auto"
                  priority
                  sizes="(max-width: 500px) 100vw, 500px"
                />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Follow The Bill
              </h1>
              <p className="font-sans text-xl md:text-2xl text-black/80 mb-8 leading-relaxed">
                A methodology for understanding investment opportunities by tracing
                capital flows through the <strong>AI</strong> and <strong>Robotics</strong> ecosystems.
                When billions flow into these technologies, we ask: where does that money ultimately go?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/strategy">
                  <Button className="w-full sm:w-auto bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none font-sans text-lg px-8 py-6">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Strategy
                  </Button>
                </Link>
                <Link href="/strategy/robotics">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none font-sans text-lg px-8 py-6"
                  >
                    <Bot className="h-5 w-5 mr-2" />
                    Robotics Strategy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Two Ecosystems */}
        <section className="border-b-2 border-black bg-black text-white">
          <div className="section-container py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x-2 divide-white/20">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-8 w-8" />
                  <h3 className="font-serif text-2xl font-bold">AI Ecosystem</h3>
                </div>
                <p className="font-sans text-sm text-white/80 mb-4">
                  From cloud providers and AI companies through semiconductors,
                  data centers, energy, and fundamental resources.
                </p>
                <Link href="/strategy" className="font-sans text-sm font-bold border-b border-white/50 hover:border-white pb-1">
                  Explore AI Strategy →
                </Link>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-8 w-8" />
                  <h3 className="font-serif text-2xl font-bold">Robotics Ecosystem</h3>
                </div>
                <p className="font-sans text-sm text-white/80 mb-4">
                  Global robotics leaders from US, Japan, and China—humanoid robots,
                  industrial automation, sensors, and shared infrastructure.
                </p>
                <Link href="/strategy/robotics" className="font-sans text-sm font-bold border-b border-white/50 hover:border-white pb-1">
                  Explore Robotics Strategy →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="border-b-2 border-black">
          <div className="section-container py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x-2 divide-black/20">
              <div className="p-8 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">
                  Dual Ecosystem Analysis
                </h3>
                <p className="font-sans text-sm text-black/80">
                  Deep-dive research into AI and Robotics supply chains with shared infrastructure insights
                </p>
              </div>
              <div className="p-8 text-center">
                <Shield className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">
                  Global Coverage
                </h3>
                <p className="font-sans text-sm text-black/80">
                  Stocks from US, Japan, China, and Europe—covering all major robotics and AI markets
                </p>
              </div>
              <div className="p-8 text-center">
                <Users className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">
                  Community Driven
                </h3>
                <p className="font-sans text-sm text-black/80">
                  Join discussions with like-minded strategic investors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Flow Diagrams - Side by Side */}
        <section className="border-b-2 border-black">
          <div className="section-container py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Two Investment Chains
              </h2>
              <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                Understanding how capital flows through both ecosystems—with shared
                infrastructure at the foundation.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Brain className="h-5 w-5" /> AI Ecosystem
                </h3>
                <InvestmentFlow />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Bot className="h-5 w-5" /> Robotics Ecosystem
                </h3>
                <RoboticsInvestmentFlow />
              </div>
            </div>
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
                Our most recent analysis covering both AI and Robotics ecosystem investments.
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
              Join our educational community exploring AI and Robotics investment theses.
              Access research reports, discussion forums, and strategic analysis.
            </p>
            <SignUpCTA />
            <p className="font-sans text-xs text-white/50 mt-6 max-w-lg mx-auto">
              This is an educational non-profit. We do not offer financial advice or manage investments.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
