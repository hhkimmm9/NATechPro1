'use client'

import { SessionProvider } from 'next-auth/react'
import { CssBaseline, NextUIProvider } from "@nextui-org/react"
import AppContextProvider from "./hooks/context";

const Provider = ({ children, session }) => {
  return (
    <AppContextProvider>
      <SessionProvider session={session}>
        <NextUIProvider>
          { children }
        </NextUIProvider>
      </SessionProvider>
    </AppContextProvider>
  )
}

export default Provider