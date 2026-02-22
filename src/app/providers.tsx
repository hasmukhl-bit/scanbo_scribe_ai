"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import theme from "@/theme/theme";
import { SidebarProvider } from "@/components/layout/SidebarState";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
