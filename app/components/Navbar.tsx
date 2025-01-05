"use client"

import Link from "next/link"
import { Facebook, Instagram, ShoppingBag, Twitter, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSidebar } from "./Cart"
import Image from "next/image"
import logo from '../../public/Logo 5star nation copia 2.svg'
import { useEffect, useState } from "react"
export function Navbar() {
  const { items } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      setIsSidebarOpen(true)
    }
  }, [items.length])

  return (
    <div className={`d-flex flex-col fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur' : 'bg-transparent'}`}>
      <div className="flex flex-row justify-between space-x-4 bg-[#c1272d] py-1  px-4 sm:px-8">
        <p className="text-white flex flex-col items-center justify-center">SOCIAL:</p>
        <div className="flex flex-row gap-2 justify-end sm:justify-around m:flex-1">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Facebook color="white" size={30} strokeWidth={1.5} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter color="white" size={30} strokeWidth={1.5} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram color="white" size={30} strokeWidth={1.5} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Youtube color="white" size={30} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <nav>
        <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            <Image alt="Artie 5ive logo" src={logo} width={100} />
          </Link>

          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button size="icon" className="relative w-fit bg-transparent hover:bg-transparent">
                <ShoppingBag className="text-white" style={{ width: '1.8rem', height: '1.8rem' }} size={48} strokeWidth={1.5} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-[#c1272d] text-white text-xs flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <CartSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="px-6 pt-2">

      </div>
    </div>
  )
}

