import { useNavigate } from "react-router";

import { AuthCard } from "@/components/AuthCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";

export function SignInPage() {
  usePageMeta({
    title: "Sign in — Flight Price Notifier",
    description: "Sign in to Flight Price Notifier to manage your fare alerts.",
    ogTitle: "Sign in — Flight Price Notifier",
    ogDescription: "Sign in to manage your flight fare alerts.",
  });
  const navigate = useNavigate();

  return (
    <AuthCard
      mode="signin"
      onSubmit={async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return "Email 或密碼不正確 · Invalid email or password.";
        void navigate("/app");
        return null;
      }}
    />
  );
}
