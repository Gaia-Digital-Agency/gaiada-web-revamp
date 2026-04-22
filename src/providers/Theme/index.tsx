'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: defaultTheme,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  const setTheme = useCallback((themeToSet: Theme | null) => {
    // Always set to light theme - dark mode is disabled
    setThemeState(defaultTheme)
    window.localStorage.setItem(themeLocalStorageKey, defaultTheme)
    document.documentElement.setAttribute('data-theme', defaultTheme)
  }, [])

  useEffect(() => {
    // Always initialize to light theme
    document.documentElement.setAttribute('data-theme', defaultTheme)
    setThemeState(defaultTheme)
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
