"use client";

import * as React from "react";

type SidebarState = {
  open: boolean;
  setOpen: (next: boolean) => void;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarState | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpenState] = React.useState(false);

  React.useEffect(() => {
    const saved = window.localStorage.getItem("scanbo.sidebarOpen");
    if (saved !== null) {
      setOpenState(saved === "true");
    }
  }, []);

  const setOpen = React.useCallback((next: boolean) => {
    setOpenState(next);
    window.localStorage.setItem("scanbo.sidebarOpen", String(next));
  }, []);

  const toggle = React.useCallback(() => {
    setOpenState((prev) => {
      const next = !prev;
      window.localStorage.setItem("scanbo.sidebarOpen", String(next));
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}
