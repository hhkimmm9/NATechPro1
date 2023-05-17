"use client";

import './css/globals.css'
import { Inter } from 'next/font/google'
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Provider from './components/Provider';
import { CssBaseline, NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mosPic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <head>{CssBaseline.flush()}</head>

        <body className={inter.className}>
          <div className='flex flex-col relative h-screen'>
            <TopNavBar />

            <NextUIProvider>
              <div className='flex flex-row'>
                  <div className='w-full'>
                    {children}
                  </div>
              </div>
            </NextUIProvider>

            <div className='absolute bottom-0 w-full'>
              <Footer/>
            </div>
          </div>
        </body>
      </Provider>
    </html>
  );
}
