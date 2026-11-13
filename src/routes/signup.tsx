import { useState } from "react";
import { useNavigate } from "react-router";

import { AuthCard } from "@/components/AuthCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";

export function SignUpPage() {
  usePageMeta({
    title: "Sign up — Flight Price Notifier",
    description: "Create a Flight Price Notifier account and get emailed when fares drop.",
    ogTitle: "Sign up — Flight Price Notifier",
    ogDescription: "Create an account and get emailed when fares drop.",
  });
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
          void navigate("/app");
        } else {
          setCheckEmail(true);
        }
        return null;
      }}
    />
  );
}
