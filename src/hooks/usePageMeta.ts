import { useEffect } from "react";

export interface PageMeta {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === undefined) {
    if (el?.dataset["pageMeta"] === "true") el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.dataset["pageMeta"] = "true";
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Client-side replacement for per-route `head()` meta: sets title and meta tags while mounted. */
export function usePageMeta({ title, description, ogTitle, ogDescription, robots }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", ogTitle);
    setMeta("property", "og:description", ogDescription);
    setMeta("name", "robots", robots);
  }, [title, description, ogTitle, ogDescription, robots]);
}
