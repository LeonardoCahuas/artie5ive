import { Metadata } from 'next'
import { Bruno_Ace } from 'next/font/google'
import { Navbar } from './components/Navbar'
import './globals.css'
import CookiePolicy from './components/Cookies'

// Ottimizzazione del font loading
const brunoAce = Bruno_Ace({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-bruno-ace',
})

// Metadata per SEO
export const metadata: Metadata = {
  title: {
    default: 'Artie 5ive | Starsnation',
    template: '%s | Artie 5ive'
  },
  description: 'Artie 5ive, rapper italiano firmato con Trenches Records Entertainment. Scopri la sua musica, i suoi ultimi singoli e album.',
  keywords: ['Artie 5ive', 'rapper italiano', 'Trenches Records', 'hip hop italiano', 'rap italiano', 'musica italiana'],
  authors: [{ name: 'Artie 5ive' }],
  creator: 'Artie 5ive',
  publisher: 'Trenches Records Entertainment',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://starsnation.it',
    siteName: 'Artie 5ive Official Website',
    title: 'Artie 5ive | Rapper Italiano | Trenches Records',
    description: 'Artie 5ive, rapper italiano dalla periferia di Milano. Scopri il suo nuovo merch, la sua musica, i suoi ultimi singoli e album.',
    images: [
      {
        url: '/Logo artie.svg',
        width: 1200,
        height: 630,
        alt: 'Artie 5ive',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artie 5ive | Rapper Italiano',
    description: 'Artie 5ive, rapper italiano dalla periferia di Milano. Scopri il suo nuovo merch, la sua musica, i suoi ultimi singoli e album.',
    images: ['//Logo artie.svg'],
  },
  icons: {
    icon: '/Logo artie.svg',
    shortcut: '/Logo artie.svg',
    apple: '/Logo artie.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/Logo artie.svg',
    },
  },
  manifest: '/site.webmanifest',
  category: 'music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="it"
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className="bg-black min-h-screen font-sans antialiased">
        <Navbar />
        <main className={brunoAce.className}>
          <CookiePolicy/>
          {children}
        </main>
      </body>
    </html>
  )
}

