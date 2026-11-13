import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { routes } from "@/router";
import { AUTHENTICATED_ROUTE_ID } from "@/routes/route-ids";

// Match routes without running loaders or rendering: loaders need Supabase/network the
// test run lacks.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const matches = matchRoutes(routes, "/");
    expect(matches?.at(-1)?.route.index).toBe(true);
  });

  it.each(["/signin", "/signup"])("matches %s", (path) => {
    const matches = matchRoutes(routes, path);
    expect(matches?.at(-1)?.route.path).toBe(path.slice(1));
  });

  it("puts /app behind the authenticated guard", () => {
    const matches = matchRoutes(routes, "/app") ?? [];
    expect(matches.map((m) => m.route.id)).toContain(AUTHENTICATED_ROUTE_ID);
    expect(matches.at(-1)?.route.path).toBe("app");
  });

  it("falls back to not found for unknown paths", () => {
    const matches = matchRoutes(routes, "/does-not-exist");
    expect(matches?.at(-1)?.route.path).toBe("*");
  });
});
