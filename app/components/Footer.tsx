import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log('Signed up with email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-black text-white">
      <div className="bg-[#c1272d] py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold mb-4">UNISCITI A 5IVE STARS NATION</h2>
            <p className="text-MEDIUM mb-8">ISCRIVITI ALLA NOSTRA NEWSLETTER PER RIMANERE SEMPRE AGGIORNATO!</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Inserisici la tua mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow py-3 px-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-[#c1272d] py-3 px-8 rounded-full font-semibold flex items-center justify-center hover:bg-opacity-90 transition-colors text-sm"
              >
                ISCRIVITI <ChevronRight className="ml-2" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">5IVE STARS NATION</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">LEGAL</h4>
            <ul className="space-y-2">
              <Link href="/privacy"><p className="text-gray-400 hover:text-white transition-colors">PRIVACY POLICY</p></Link>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li> */}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; 2023 TRENCHES RECORDS ENT. TUTTI I DIRITTI RISERVATI.</p>
        </div>
      </div>
    </footer>
  )
}

