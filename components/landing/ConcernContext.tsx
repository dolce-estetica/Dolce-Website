"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const ConcernContext = createContext<{
  concern: string;
  setConcern: (concern: string) => void;
} | null>(null);

/** One selection for service cards, chips, and both consultation forms. */
export function ConcernProvider({ children, defaultConcern = "" }: { children: ReactNode; defaultConcern?: string }) {
  const [concern, setConcern] = useState(defaultConcern);
  return <ConcernContext.Provider value={{ concern, setConcern }}>{children}</ConcernContext.Provider>;
}

export function useConcern(defaultConcern = "") {
  const context = useContext(ConcernContext);
  const [concern, setConcern] = useState(defaultConcern);
  return context ?? { concern, setConcern };
}

export function ConcernLink({ concern, children, className }: { concern?: string; children: ReactNode; className?: string }) {
  const { setConcern } = useConcern();
  return <a href="#book" className={className} onClick={() => { if (concern) setConcern(concern); }}>{children}</a>;
}
