import { Link } from "react-router";
import { Plane } from "lucide-react";

export function BrandLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 rounded-md font-display text-xl font-semibold text-ivory"
    >
      <span className="grid size-8 place-items-center rounded-full bg-gradient-primary shadow-glow">
        <Plane className="size-4 -rotate-45 text-primary-foreground" aria-hidden="true" />
      </span>
      <span>Flight Price Notifier</span>
    </Link>
  );
}
