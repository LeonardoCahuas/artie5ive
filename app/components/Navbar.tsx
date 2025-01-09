"use client"

import Link from "next/link"
import { ShoppingBag } from 'lucide-react'
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
    if (items.length == 0) {
      setIsSidebarOpen(false)
    }
  }, [items.length])

  return (
    <div className={`d-flex flex-col fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur' : 'bg-transparent'}`}>
      <div className="flex flex-row justify-between space-x-4 bg-[#c1272d] py-1  px-4 sm:px-8">
        <p className="text-white flex flex-col items-center justify-center"></p>
        <div className="flex flex-row gap-3 justify-end sm:justify-around m:flex-1">
          <a href="https://www.instagram.com/artie5ive/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <i className="fa-brands fa-instagram text-white text-2xl" ></i>
          </a>
          <a href="https://www.youtube.com/channel/UC-xCxVgJcaeTk__KaFpPwwQ" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <i className="fa-brands fa-youtube text-white text-2xl" ></i>
          </a>
          <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjR3IfM8uWKAxXV0QIHHTiTEVwQFnoECBwQAQ&url=https%3A%2F%2Fwww.tiktok.com%2F%40artiestar%3Flang%3Dit-IT&usg=AOvVaw1vYRecEH9WQ14fgoKM4k03&opi=89978449" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <i className="fa-brands fa-tiktok text-white text-2xl" ></i>
          </a>
        </div>
      </div>
      <nav>
        <div className="w-full px-4 sm:px-8 py-1 flex items-center justify-between">
          <div className="w-1/4"></div>
          <Link href="/" className="text-2xl font-bold text-red-600 w-1/2 flex flex-col items-center">
            <Image alt="Artie 5ive logo" src={logo} width={150} />
          </Link>
<div className="w-1/4 flex flex-col items-end">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button size="icon" className="relative w-fit bg-transparent hover:bg-transparent">
                <ShoppingBag className="text-white" style={{ width: '1.8rem', height: '1.8rem' }} size={48} strokeWidth={1.5} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-[#c1272d] text-white text-xs flex items-center justify-center">
                    {items.reduce((total, item) => total + item.quantity, 0)}

                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <CartSidebar />
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </nav>
      <div className="px-6 pt-2">

      </div>
    </div>
  )
}

