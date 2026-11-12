import { queryOptions, useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export const sessionUserQuery = queryOptions({
  queryKey: ["session-user"],
  queryFn: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user ?? null;
  },
  staleTime: 60_000,
});

/** Signed-in user for UI affordances only (header button). Route access is guarded separately. */
export function useSessionUser() {
  return useQuery(sessionUserQuery);
}
