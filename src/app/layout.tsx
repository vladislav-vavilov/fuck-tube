import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'
import { Toaster } from 'sonner'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TuoYube',
  description: 'YouTube alternative'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='min-h-full'>
      <body
        className={
          (montserrat.className,
          'flex h-full flex-col bg-neutral-800 text-white')
        }
      >
        <Providers>
          <Header />
          {children}
          <Toaster theme='dark' richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
