import { useEffect, useState } from "react";

// Tiny hash router: "#/projects/<slug>" opens a project page.
// Plain anchors like "#skills" still scroll on the home page.
const PATTERN = /^#\/projects\/([\w-]+)$/;

const readSlug = () => PATTERN.exec(window.location.hash)?.[1] ?? null;

export function useProjectRoute() {
  const [slug, setSlug] = useState(readSlug);

  useEffect(() => {
    const onChange = () => setSlug(readSlug());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return slug;
}

export function openProject(slug: string) {
  sessionStorage.setItem("returnToProjects", "1");
  window.location.hash = `/projects/${slug}`;
}

// Back button: go back in history if we came from the home page,
// otherwise (e.g. someone opened the link directly) go to the Projects section.
export function leaveProject() {
  if (sessionStorage.getItem("returnToProjects")) {
    window.history.back();
  } else {
    sessionStorage.setItem("returnToProjects", "1");
    window.location.hash = "";
  }
}
