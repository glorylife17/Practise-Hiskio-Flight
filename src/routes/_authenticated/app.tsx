import type { User } from "@supabase/supabase-js";
import { LogOut, Radar } from "lucide-react";
import { useRouteLoaderData } from "react-router";

import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSignOut } from "@/hooks/useSignOut";
import { AUTHENTICATED_ROUTE_ID } from "@/routes/route-ids";

export function AppDashboard() {
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "Your Flight Price Notifier dashboard.",
    ogTitle: "Dashboard — Flight Price Notifier",
    ogDescription: "Your Flight Price Notifier dashboard.",
    robots: "noindex",
  });
  // The parent "authenticated" route's loader redirects to /signin when there is no user.
  const { user } = useRouteLoaderData(AUTHENTICATED_ROUTE_ID) as { user: User };
  const signOut = useSignOut();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />

      <header className="relative border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <BrandLogo />
          <Button variant="glass" size="sm" onClick={signOut}>
            <LogOut aria-hidden="true" />
            Sign out / 登出
          </Button>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-5 py-20">
        <div className="reveal is-visible">
          <h1 className="break-all text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi <span className="text-gradient">{user.email}</span>
          </h1>

          <div className="mt-10 rounded-2xl border border-border bg-card/80 p-8 shadow-card">
            <div className="grid size-12 place-items-center rounded-xl bg-accent">
              <Radar className="size-6 text-primary-glow" aria-hidden="true" />
            </div>
            <p className="mt-6 text-lg leading-relaxed">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next
              milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
