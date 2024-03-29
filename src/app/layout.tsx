import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import TopNavBar from './layouts/TopNavBar'
import Footer from './layouts/Footer'
import Provider from '@/app/components/Provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "mosPic",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='hidden md:block'>
          <Provider>
            <div className='flex flex-col relative min-h-screen'>
              <div className='fixed top-0 left-0 right-0'>
                <TopNavBar />
              </div>

              <div className='my-16'>
                { children }
              </div>

              <div className='absolute bottom-0 left-0 right-0'>
                <Footer/>
              </div>
            </div>
          </Provider>
        </div>

        {/* smaller screen */}
        <div className='
          h-screen
          text-center
          flex
          flex-col
          justify-center
          md:hidden
        '>
          <p className='text-2xl'>NO SUPPORT DEVICES WITH LESS THAN 768 PX IN LENGTH.</p>
        </div>
      </body>
    </html>
  );
}
