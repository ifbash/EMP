// context/SidebarContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isNavigatorOpen: boolean;
  setIsNavigatorOpen: (open: boolean) => void;
  isNavigatorPinned: boolean;
  setIsNavigatorPinned: (pinned: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isNavigatorPinned, setIsNavigatorPinned] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isNavigatorOpen,
        setIsNavigatorOpen,
        isNavigatorPinned,
        setIsNavigatorPinned,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}