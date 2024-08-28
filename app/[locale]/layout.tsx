import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import Telemetry from '@/components/Telemetry'

const fontFamily = localFont({
  src: [
    {
      path: '../../public/fonts/sofachrome.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/sofachrome.otf',
      weight: '700',
      style: 'bold',
    },
  ],
})

export const metadata: Metadata = {
  title: {
    absolute: 'Nid-Search | Decentralized Web Search Companion App Of Niddam-Labs',
    default: 'Nid-Search',
    template: '%s | Nid-Search',
  },
  description:
    'Open source assistant for AI and Web search decentralized. Explore a healthier internet with Findto.',
  
  icons: {
    icon: [
      '/ns.ico?v=2',
      '/icon-192x192.png?v=2',
      '/icon-512x512.png?v=2',
      '/icon-1024x1024.png?v=2',
      // 'icon.svg?v=2',
    ],
    apple: '/apple-touch-icon.png?v=2',
  },
  manifest: '/manifest.json?v=2',
  appleWebApp: {
    capable: true,
    title: 'Nid-Search',
    statusBarStyle: 'black-translucent',
  },
  applicationName: 'Nid-Search',
  themeColor: '#ffffff',

  metadataBase: new URL('https://findto.app'),
  alternates: {
    languages: {
      en: '/en',
      'pt-BR': '/pt-BR',
    },
  },
  openGraph: {
    images: '/share.png',
    type: 'website',
  },
  twitter: {
    site: '@findtoapp',
    creator: '@lucasmezs',
    card: 'summary_large_image',
    images: '/share.png',
  },
}

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={fontFamily.className}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem={true}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>

      <Telemetry />
    </html>
  )
}
