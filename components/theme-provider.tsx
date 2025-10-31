/**
 * Theme Provider Component
 * 
 * 此元件封裝了 next-themes 的 ThemeProvider,用於在應用中實作暗色/亮色主題切換。
 * 
 * 使用方式:
 * 1. 在 app/layout.tsx 中包裹 children:
 *    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *      {children}
 *    </ThemeProvider>
 * 
 * 2. 在任何元件中使用 useTheme hook:
 *    import { useTheme } from "next-themes"
 *    const { theme, setTheme } = useTheme()
 * 
 * 注意: 目前專案尚未啟用主題切換功能,此元件為未來擴充預留。
 */
'use client'

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import * as React from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
