import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { BackToTop } from '@/components/BackToTop'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Script from 'next/script'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = (await getCachedGlobal('settings', 1)()) as Setting | null

  const faviconData = settings?.favicon as Media | undefined
  const faviconUrl = faviconData ? getMediaUrl(faviconData.url) : '/favicon.ico'

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href={faviconUrl} rel="icon" />
        {/* We keep the SVG fallback if needed */}
        {!faviconData && <link href="/favicon.svg" rel="icon" type="image/svg+xml" />}

        {/* Google Tag Manager */}
        {settings?.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.gtmId}');`,
            }}
          />
        )}

        {/* Google Analytics */}
        {settings?.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.gaId}');
                `,
              }}
            />
          </>
        )}

        {/* Custom Header Scripts */}
        {settings?.headerScripts && (
          <script dangerouslySetInnerHTML={{ __html: settings.headerScripts }} />
        )}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {settings?.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <WhatsAppCTA />
          <BackToTop />
        </Providers>

        {/* Custom Footer Scripts */}
        {settings?.footerScripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.footerScripts }} />
        )}
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getCachedGlobal('settings', 1)()) as Setting | null

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: settings?.siteTitle || 'Gaiada Digital Agency',
      template: `%s | ${settings?.siteTitle || 'Gaiada Digital Agency'}`,
    },
    description: settings?.tagline || 'Premium Digital Agency Solutions',
    openGraph: mergeOpenGraph({
      title: settings?.siteTitle || 'Gaiada Digital Agency',
      description: settings?.tagline || 'Premium Digital Agency Solutions',
    }),
    twitter: {
      card: 'summary_large_image',
      creator: '@gaiadigital',
    },
  }
}
