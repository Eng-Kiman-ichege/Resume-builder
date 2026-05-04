"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Sparkles, Layout, CheckCircle, ArrowRight, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  if (isLoaded && user) {
    return null;
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <FileText className="h-4 sm:h-5 w-4 sm:w-5" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight">CV Craft</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {isLoaded && !user && (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-3">Log in</Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button size="sm" className="text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-4">Get Started</Button>
                </SignInButton>
              </>
            )}
            {isLoaded && user && (
              <>
                <Link href="/builder">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-3">My Resumes</Button>
                </Link>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </header>


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 md:pt-32 md:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container mx-auto px-3 sm:px-4 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="max-w-3xl mx-auto space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center rounded-full border px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-3 sm:mb-4">
                <Sparkles className="mr-1 h-3 w-3" />
                Now with AI Cover Letter Generation
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                Land your dream job with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">standout resume</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                Build professional, ATS-friendly resumes and tailored cover letters in minutes. Stand out from the crowd and get hired faster.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link href="/builder" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-8">
                    Create My Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-8">
                  View Templates
                </Button>
              </div>
            </motion.div>

            {/* Mockup Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 sm:mt-12 md:mt-16 relative mx-auto max-w-5xl px-2"
            >
              <div className="rounded-lg sm:rounded-xl border bg-background shadow-lg sm:shadow-2xl overflow-hidden flex flex-col">
                <Image src="/mockup.png" alt="CV Craft Builder Interface" width={1024} height={1024} className="w-full object-cover" priority />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Everything you need to succeed</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Our tools are designed to help you showcase your skills and experience in the best possible light.
              </p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              <motion.div variants={fadeIn}>
                <Card className="h-full border-none shadow-md bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 text-primary">
                      <Layout className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">ATS-Friendly Templates</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2">
                      Beautifully designed templates that are optimized to pass Applicant Tracking Systems with ease.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="h-full border-none shadow-md bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3 sm:mb-4 text-violet-500">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">AI Cover Letters</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2">
                      Generate tailored cover letters instantly based on your resume and the specific job description.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} className="sm:col-span-2 lg:col-span-1">
                <Card className="h-full border-none shadow-md bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3 sm:mb-4 text-green-600 dark:text-green-400">
                      <PenTool className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">Live Preview & Editing</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2">
                      See your changes in real-time. Our intuitive builder makes formatting and editing a breeze.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="container mx-auto px-3 sm:px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to get hired?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream roles using CV Craft.
            </p>
            <Button size="lg" className="h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg rounded-full">
              Build Your Resume Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" /> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" /> Free basic templates
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 sm:py-12 border-t">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1 rounded-md">
                <FileText className="h-4 w-4" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">CV Craft</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} CV Craft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
