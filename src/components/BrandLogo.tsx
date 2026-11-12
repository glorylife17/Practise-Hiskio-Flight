import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground">
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
        <Plane className="size-4 -rotate-45 text-primary-foreground" aria-hidden="true" />
      </span>
      <span>Flight Price Notifier</span>
    </Link>
  );
}
