import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Outlet, ScrollRestoration, useRevalidator, useRouteError } from "react-router";

import { Toaster } from "@/components/ui/sonner";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";

export function NotFound() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description: "Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RootErrorBoundary() {
  const error = useRouteError();
  const revalidator = useRevalidator();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              void revalidator.revalidate();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export function RootLayout() {
  const queryClient = useQueryClient();
  const revalidator = useRevalidator();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      // Re-run route guards (loaders) so protected pages react to the new session.
      void revalidator.revalidate();
      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["session-user"], null);
      } else {
        void queryClient.invalidateQueries();
      }
    });
    return () => data.subscription.unsubscribe();
    // revalidator identity changes on every navigation state change; subscribe once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient]);

  return (
    <>
      <Outlet />
      <Toaster />
      <ScrollRestoration />
    </>
  );
}
