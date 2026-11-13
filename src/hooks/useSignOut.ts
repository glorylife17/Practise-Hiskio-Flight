import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { supabase } from "@/integrations/supabase/client";

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate("/", { replace: true });
  };
}
