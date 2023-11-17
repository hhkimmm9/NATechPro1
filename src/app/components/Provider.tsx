"use client";

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import AppContextProvider from "@/app/components/hooks/context";

const Provider = (
  { children, session }: { children: React.ReactNode, session?: any }
) => {
  return (
    <>
      <SessionProvider session={session}>
        <AppContextProvider>
          { children }
        </AppContextProvider>
      </SessionProvider>
    </>
  )
}

export default Provider