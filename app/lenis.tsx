"use client";

import ReactLenis from "@studio-freight/react-lenis";

export function LenisScroll({ children }: { children: React.ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
