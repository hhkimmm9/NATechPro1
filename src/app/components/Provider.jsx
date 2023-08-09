'use client'

import { SessionProvider } from 'next-auth/react'
import { CssBaseline, NextUIProvider } from "@nextui-org/react"
import AppContextProvider from "./hooks/context";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <NextUIProvider>
          { children }
        </NextUIProvider>
      </AppContextProvider>
    </SessionProvider>
  )
}

export default Provider