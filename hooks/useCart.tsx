"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  images: string[];
  quantity: number;
  variantId: string;
  lineId?: string;
  variants: any
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  decreaseItem: (item: CartItem) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  checkoutId: string;
  setCheckoutId: (id: string) => void;
  products: CartItem[]
  setProducts: (items: CartItem[]) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      checkoutId: '',
      setCheckoutId: (id) => set({ checkoutId: id }),
      products: [],
      setProducts: (items) => set({ products: items }),
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.lineId === item.lineId);
        let newItems;
        if (existingItem) {
          newItems = state.items.map(i => i.lineId === item.lineId ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          newItems = [...state.items, { ...item, quantity: 1 }];
        }
        return {
          items: newItems,
          totalPrice: newItems.reduce((total, i) => total + i.price * i.quantity, 0), // Calcola il prezzo totale qui
        };
      }),
      decreaseItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.lineId === item.lineId);
        if (existingItem && existingItem.quantity > 1) {
          const newItems = state.items.map(i => i.lineId === item.lineId ? { ...i, quantity: i.quantity - 1 } : i);
          return {
            items: newItems,
            totalPrice: newItems.reduce((total, i) => total + i.price * i.quantity, 0), // Calcola il prezzo totale qui
          };
        } else if (existingItem && existingItem.quantity === 1) {
          const items = state.items.filter((i) => i.lineId !== item.lineId);
          return {
            items,
            totalPrice: items.reduce((total, i) => total + i.price * i.quantity, 0),
          };
        }
        return state; // Non fare nulla se l'item non esiste
      }),
      removeItem: (lineId) => set((state) => {
        const items = state.items.filter((item) => item.lineId !== lineId);
        return {
          items,
          totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
        };
      }),
      clearCart: () => set({ items: [], totalPrice: 0 }),
      totalPrice: 0,
    }),
    {
      name: 'cart-storage',
    }
  )
);