'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      
      if (result.success) {
        alert(result.message)
        formRef.current?.reset()
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
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
            <form ref={formRef} onSubmit={async (e) => {
              e.preventDefault()
              await handleSubmit(new FormData(e.currentTarget))
            }} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                placeholder="Inserisici la tua mail"
                className="flex-grow py-3 px-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-white text-[#c1272d] py-3 px-8 rounded-full font-semibold flex items-center justify-center hover:bg-opacity-90 transition-colors text-sm disabled:opacity-50"
              >
                {isPending ? 'INVIO...' : 'ISCRIVITI'} <ChevronRight className="ml-2" />
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
              <a href="https://www.instagram.com/artie5ive/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa-brands fa-instagram text-2xl" ></i>
              </a>
              <a href="https://www.youtube.com/channel/UC-xCxVgJcaeTk__KaFpPwwQ" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa-brands fa-youtube text-2xl" ></i>
              </a>
              <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjR3IfM8uWKAxXV0QIHHTiTEVwQFnoECBwQAQ&url=https%3A%2F%2Fwww.tiktok.com%2F%40artiestar%3Flang%3Dit-IT&usg=AOvVaw1vYRecEH9WQ14fgoKM4k03&opi=89978449" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <i className="fa-brands fa-tiktok text-2xl" ></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">LEGAL</h4>
            <ul className="space-y-2">
              <Link href="/privacy"><p className="text-gray-400 hover:text-white transition-colors">PRIVACY POLICY</p></Link>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; 2025 5STARSNATION . TUTTI I DIRITTI RISERVATI.</p>
        </div>
      </div>
    </footer>
  )
}

