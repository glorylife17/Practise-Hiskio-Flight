import { Outlet, redirect, type RouteObject } from "react-router";

import { supabase } from "@/integrations/supabase/client";
import { NotFound, RootErrorBoundary, RootLayout } from "@/routes/RootLayout";
import { AppDashboard } from "@/routes/_authenticated/app";
import { LandingPage } from "@/routes/index";
import { SignInPage } from "@/routes/signin";
import { AUTHENTICATED_ROUTE_ID } from "@/routes/route-ids";
import { SignUpPage } from "@/routes/signup";

// Session lives in browser storage, so these guards run client-side before the page renders.
async function redirectIfSignedIn() {
  const { data } = await supabase.auth.getSession();
  if (data.session) throw redirect("/app");
  return null;
}

async function requireUser() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw redirect("/signin");
  return { user: data.user };
}

export const routes: RouteObject[] = [
  {
    id: "root",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    hydrateFallbackElement: null,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "signin", loader: redirectIfSignedIn, element: <SignInPage /> },
      { path: "signup", loader: redirectIfSignedIn, element: <SignUpPage /> },
      {
        id: AUTHENTICATED_ROUTE_ID,
        loader: requireUser,
        element: <Outlet />,
        children: [{ path: "app", element: <AppDashboard /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
