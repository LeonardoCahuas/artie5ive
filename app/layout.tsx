import { Navbar } from './components/Navbar'
import { brunoAce } from './fonts'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={brunoAce.className}>
     <body className={'bg-black'}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

