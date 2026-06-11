"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useThemeBuilder } from "@/contexts/theme-builder-context"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { customThemeCss } = useThemeBuilder();

  return (
    <NextThemesProvider {...props}>
      {customThemeCss && <style>{customThemeCss}</style>}
      {children}
    </NextThemesProvider>
  )
}
