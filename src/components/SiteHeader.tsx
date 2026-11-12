import { Link } from "@tanstack/react-router";

import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { useSessionUser } from "@/hooks/useSessionUser";

export function SiteHeader() {
  const { data: user } = useSessionUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <BrandLogo />
        {user ? (
          <Button asChild variant="hero" size="sm">
            <Link to="/app">Dashboard</Link>
          </Button>
        ) : (
          <Button asChild variant="hero" size="sm">
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
