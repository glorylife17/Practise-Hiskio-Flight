import { BellRing, CalendarX2, Radar, TrendingDown } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "react-router";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    en: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    en: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    en: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function LandingPage() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "Set a route and a target price — we email you when the fare drops. 設定航線與目標價，機票降價就通知你。",
    ogTitle: "Flight Price Notifier — 機票降價通知",
    ogDescription: "Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-20 md:pt-28 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                台北出發 · Tokyo · Seoul
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                <span className="text-gradient">Flight Price Notifier</span>
              </h1>
              <p className="mt-6 text-xl font-medium leading-snug sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-3 max-w-lg text-base text-muted-foreground sm:text-lg">
                Set a route and a target price — we email you when the fare drops.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/signup">Get started / 免費註冊</Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/signin">Sign in / 登入</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delayMs={150} className="relative">
              <FareAlertPreview />
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-glow">
              How it works
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              不在乎哪天飛，只在乎票價夠低
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.en} delayMs={i * 120}>
                <article className="group h-full rounded-2xl border border-border bg-card p-7 shadow-card transition-colors hover:border-primary/40">
                  <div className="grid size-11 place-items-center rounded-xl bg-accent transition-transform group-hover:scale-105">
                    <f.icon className="size-5 text-primary-glow" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.en}</p>
                  <p className="mt-4 leading-relaxed text-foreground/85">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-sm text-muted-foreground">
          <span>© 2026 Flight Price Notifier</span>
          <span className="hidden sm:inline">Made for budget travelers</span>
        </div>
      </footer>
    </div>
  );
}

/** Illustrative sample alert — not live fare data. */
function FareAlertPreview() {
  return (
    <div className="animate-float-soft relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-20 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-border bg-card/90 p-6 shadow-card backdrop-blur">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Price alert · 範例</span>
          <span className="rounded-full bg-success/15 px-2 py-0.5 font-medium text-success">
            達標
          </span>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div>
            <p className="text-3xl font-semibold tracking-tight">TPE</p>
            <p className="text-xs text-muted-foreground">台北</p>
          </div>
          <div className="relative h-px flex-1 bg-border">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary-glow" />
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold tracking-tight">NRT</p>
            <p className="text-xs text-muted-foreground">東京</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-xs text-muted-foreground">目標價 Target</p>
            <p className="mt-1 font-semibold">NT$ 7,000</p>
          </div>
          <div className="rounded-xl bg-accent p-3">
            <p className="text-xs text-muted-foreground">最低價 Now</p>
            <p className="mt-1 flex items-center gap-1 font-semibold text-success">
              <TrendingDown className="size-4" aria-hidden="true" />
              NT$ 6,280
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground">
          ✉️ 已寄出通知到 you@example.com
        </div>
      </div>
    </div>
  );
}
