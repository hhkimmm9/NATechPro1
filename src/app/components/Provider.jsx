'use client'

import { SessionProvider } from 'next-auth/react'
import { CssBaseline, NextUIProvider } from "@nextui-org/react"

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        { children }
      </NextUIProvider>
    </SessionProvider>
  )
}

export default Provider