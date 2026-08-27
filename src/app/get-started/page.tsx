"use client";

// AnimatedBackground disabled per user request
// import AnimatedBackground from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Camera, Upload, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BetaAccessDialog } from "@/components/BetaAccessDialog";
import JsonLd from "@/components/JsonLd";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/get-started#webpage",
      name: "Get Started with MyCalAgent",
      url: "https://www.mycalagent.com/get-started",
      description: "Create a MyCalAgent account and start using AI-powered meal analysis and wellness tracking.",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      publisher: { "@id": "https://www.mycalagent.com/#organization" },
      about: ["AI meal analysis", "nutrition tracking", "wellness pattern recognition"],
      potentialAction: {
        "@type": "RegisterAction",
        name: "Create a MyCalAgent account",
        target: "https://www.mycalagent.com/get-started",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
        { "@type": "ListItem", position: 2, name: "Get Started", item: "https://www.mycalagent.com/get-started" },
      ],
    },
  ],
};

export default function GetStartedPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBetaDialog, setShowBetaDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowBetaDialog(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <JsonLd data={jsonLd} />
      {/* <AnimatedBackground /> */}
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits */}
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Journey to
                <br />
                <span className="gradient-text">Better Nutrition</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users tracking their nutrition with AI-powered computer vision.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#15803D] to-[#10B981] flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Instant Food Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      Simply snap a photo of your meal and get complete nutritional analysis in seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">No Manual Input</h3>
                    <p className="text-sm text-muted-foreground">
                      Forget tedious logging. Our AI does all the work for you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Achieve Your Goals</h3>
                    <p className="text-sm text-muted-foreground">
                      Track progress, get insights, and reach your health goals faster.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl glass-card">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#15803D] to-[#10B981] border-2 border-background"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold">Join 50,000+ users</div>
                    <div className="text-sm text-muted-foreground">Already tracking with MyCalAgent</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sign Up Form */}
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
                <div className="p-8 md:p-10 rounded-3xl glass border-2 border-purple-500/20">
                  <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
                  <p className="text-muted-foreground mb-8">Start your 3-day free trial.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="••••••••"
                        required
                        minLength={8}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Must be at least 8 characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#15803D] to-[#10B981] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Start Free Trial
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <a href="/login" className="text-purple-500 font-medium hover:underline">
                        Sign in
                      </a>
                    </p>
                </form>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <a href="#" className="underline hover:text-foreground">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="underline hover:text-foreground">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BetaAccessDialog open={showBetaDialog} onOpenChange={setShowBetaDialog} />
      </main>
    </div>
  );
}
