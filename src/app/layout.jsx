import './globals.css'
import { Inter } from 'next/font/google'
import TopNavBar from './layouts/TopNavBar'
import Footer from './layouts/Footer'
import Provider from './components/Provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "mosPic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className='flex flex-col relative min-h-screen'>
            <div className='fixed top-0 left-0 right-0'>
              <TopNavBar />
            </div>

            <div className='mt-16 mb-48'>
              { children }
            </div>

            <div className='absolute bottom-0 left-0 right-0'>
              <Footer/>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
