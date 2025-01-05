"use client"

import { StaticImageData } from 'next/image'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  size: string
  images: StaticImageData[]
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalPrice: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const items = [...state.items, item]
        return {
          items,
          totalPrice: items.reduce((total, item) => total + item.price, 0)
        }
      }),
      removeItem: (id) => set((state) => {
        const items = state.items.filter((item) => item.id !== id)
        return {
          items,
          totalPrice: items.reduce((total, item) => total + item.price, 0)
        }
      }),
      clearCart: () => set({ items: [], totalPrice: 0 }),
      totalPrice: 0
    }),
    {
      name: 'cart-storage'
    }
  )
)

