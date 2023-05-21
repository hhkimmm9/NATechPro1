"use client";

import './css/globals.css'
import { Inter } from 'next/font/google'
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Provider from './components/Provider';
import { CssBaseline, NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

// Commented out below code because 'use client' doesn't like it
// export const metadata = {
//   title: "mosPic",
//   description: "Generated by create next app",
// };

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
          <div className='flex flex-col relative min-h-screen'>
            <div className='fixed top-0 left-0 right-0'>
              <TopNavBar />
            </div>

            <NextUIProvider>
              <div className='mt-16 mb-48'>
                { children }
              </div>
            </NextUIProvider>

            <div className='absolute bottom-0 left-0 right-0'>
              <Footer/>
            </div>
          </div>
        </body>
      </Provider>
    </html>
  );
}
