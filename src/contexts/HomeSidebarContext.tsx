import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type HomeSidebarContextValue = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  /** Slug of the topic shown in the sidebar detail view; null = list view */
  selectedSlug: string | null;
  openTopic: (slug: string) => void;
  goBack: () => void;
};

const HomeSidebarContext = createContext<HomeSidebarContextValue | null>(null);

export function HomeSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedSlug(null);
  }, []);
  const openTopic = useCallback((slug: string) => setSelectedSlug(slug), []);
  const goBack = useCallback(() => setSelectedSlug(null), []);
  return (
    <HomeSidebarContext.Provider
      value={{ isOpen, toggle, close, selectedSlug, openTopic, goBack }}
    >
      {children}
    </HomeSidebarContext.Provider>
  );
}

export function useHomeSidebar() {
  const ctx = useContext(HomeSidebarContext);
  return ctx;
}
