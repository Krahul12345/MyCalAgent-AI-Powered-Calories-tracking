"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import { GeoFlag } from "@/components/GeoFlag";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-mycalagent-works" },
  { label: "AI Insights", href: "/ai-wellness-insights" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const featureSubPages = [
  { label: "AI Meal Analysis", href: "/features/ai-meal-analysis" },
  { label: "Food & Mood", href: "/features/food-and-mood" },
  { label: "Hydration Tracking", href: "/features/hydration-tracking" },
  { label: "Intermittent Fasting", href: "/features/intermittent-fasting" },
  { label: "Apple Health", href: "/features/apple-health" },
  { label: "Wellness Patterns", href: "/features/wellness-pattern-recognition" },
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  const finalNavItems = [
    ...navItems,
    ...(session?.user ? [{ label: "Dashboard", href: "/analytics" }] : []),
  ];

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error("Failed to sign out");
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg lg:text-2xl flex-shrink-0">
            <Image
              src="/mycalagent-logo.webp"
              alt="MyCalAgent Logo"
              width={56}
              height={56}
              className="w-14 h-14 object-contain rounded-2xl mix-blend-multiply flex-shrink-0"
              priority
            />
            <span className="text-foreground" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>
              MyCal<span style={{ color: '#158341' }}>Agent</span>
            </span>
          </Link>

          {/* Desktop Navigation — only shown on lg+ (1024px+) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {finalNavItems.map((item) =>
              item.href === "/features" ? (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm xl:text-base font-medium transition-colors whitespace-nowrap ${
                      pathname.startsWith("/features")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180 duration-200" />
                  </Link>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-2 min-w-[200px]">
                      <Link href="/features" className="block px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors mb-1">
                        All Features
                      </Link>
                      {featureSubPages.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm xl:text-base font-medium transition-colors whitespace-nowrap ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA — desktop lg+ */}
          <div className="hidden lg:flex items-center gap-3">
            <GeoFlag />
            {isPending ? (
              <div className="w-20 h-9 rounded-lg bg-muted animate-pulse" />
            ) : session?.user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary backdrop-blur-sm">
                  <UserIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-[120px]">{session.user.name}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : null}
          </div>

          {/* Tablet/Mobile right side — GeoFlag + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <GeoFlag />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet slide-down menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {finalNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2">
                {isPending ? (
                  <div className="w-full h-10 rounded-lg bg-muted animate-pulse" />
                ) : session?.user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary">
                      <UserIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-base font-medium">{session.user.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg hover:bg-secondary transition-colors text-base font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
