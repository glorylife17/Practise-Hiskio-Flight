import { Link } from "react-router";
import { useState, type FormEvent, type ReactNode } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { SkyBackdrop } from "@/components/SkyBackdrop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthCardProps {
  mode: "signin" | "signup";
  onSubmit: (email: string, password: string) => Promise<string | null>;
  notice?: ReactNode;
}

const copy = {
  signin: {
    title: "Welcome back",
    subtitle: "登入以管理你的航線追蹤",
    submit: "Sign in / 登入",
    switchText: "還沒有帳號？",
    switchLabel: "Sign up / 註冊",
    switchTo: "/signup" as const,
  },
  signup: {
    title: "Create your account",
    subtitle: "建立帳號，開始追蹤機票價格",
    submit: "Sign up / 註冊",
    switchText: "已經有帳號？",
    switchLabel: "Sign in / 登入",
    switchTo: "/signin" as const,
  },
};

export function AuthCard({ mode, onSubmit, notice }: AuthCardProps) {
  const c = copy[mode];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const message = await onSubmit(email.trim(), password);
    setPending(false);
    if (message) setError(message);
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12">
      <SkyBackdrop moonClassName="right-[6%] top-[6%] size-[clamp(8rem,20vw,16rem)]" />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>

        <div className="reveal is-visible marble rounded-2xl p-7">
          <h1 className="font-display text-3xl font-semibold">{c.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{c.subtitle}</p>

          {notice ? (
            <div className="mt-6 rounded-lg border border-primary/30 bg-accent/50 p-4 text-sm">
              {notice}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password / 密碼</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={pending}>
                {pending ? "Please wait…" : c.submit}
              </Button>
            </form>
          )}

          <p className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
            {c.switchText}{" "}
            <Link
              to={c.switchTo}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {c.switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
