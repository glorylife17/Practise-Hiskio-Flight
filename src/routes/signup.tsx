import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthCard } from "@/components/AuthCard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/app" });
  },
  head: () => ({
    meta: [
      { title: "Sign up — Flight Price Notifier" },
      { name: "description", content: "Create a Flight Price Notifier account and get emailed when fares drop." },
      { property: "og:title", content: "Sign up — Flight Price Notifier" },
      { property: "og:description", content: "Create an account and get emailed when fares drop." },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);

  return (
    <AuthCard
      mode="signup"
      notice={
        checkEmail ? (
          <>
            請到信箱點擊確認連結完成註冊。
            <br />
            <span className="text-muted-foreground">Check your inbox to confirm your email.</span>
          </>
        ) : undefined
      }
      onSubmit={async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) return error.message;
        if (data.session) {
          navigate({ to: "/app" });
        } else {
          setCheckEmail(true);
        }
        return null;
      }}
    />
  );
}
