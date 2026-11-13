import type { User } from "@supabase/supabase-js";
import { LogOut, Radar } from "lucide-react";
import { useRouteLoaderData } from "react-router";

import { BrandLogo } from "@/components/BrandLogo";
import { SkyBackdrop } from "@/components/SkyBackdrop";
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
    <div className="relative isolate min-h-screen overflow-hidden">
      <SkyBackdrop
        className="h-[30rem]"
        moonClassName="right-[7%] top-[18%] size-[clamp(7rem,18vw,13rem)]"
      />

      <header className="relative border-b border-ivory/15 bg-sky-top/60 backdrop-blur-xl">
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
          <h1 className="break-all font-display text-4xl font-semibold text-ivory sm:text-5xl">
            Hi <span className="text-gradient">{user.email}</span>
          </h1>

          <div className="marble mt-24 rounded-2xl p-8">
            <div className="grid size-12 place-items-center rounded-full border border-primary/30 bg-accent">
              <Radar className="size-6 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-6 font-display text-xl leading-relaxed">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
