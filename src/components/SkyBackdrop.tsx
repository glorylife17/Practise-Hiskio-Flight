import { cn } from "@/lib/utils";

interface SkyBackdropProps {
  className?: string;
  /** Moon position/size override, e.g. to keep it clear of foreground content. */
  moonClassName?: string;
}

/** Decorative dusk sky with a rising moon over a sea of clouds. */
export function SkyBackdrop({ className, moonClassName }: SkyBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-sky", className)}
      aria-hidden="true"
    >
      <div
        className={cn("moon right-[8%] top-[9%] size-[clamp(9rem,24vw,19rem)]", moonClassName)}
      />
      <div className="cloud-sea" />
    </div>
  );
}
