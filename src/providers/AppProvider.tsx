"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/providers/ThemeProvider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({
  children,
}: AppProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}