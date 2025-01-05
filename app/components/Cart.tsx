"use client"

import Image from "next/image"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'

export function CartSidebar() {
  const { items, removeItem, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Il tuo carrello è vuoto</h2>
        <p className="text-muted-foreground">Aggiungi qualcosa per iniziare</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Carrello</h2>
      <ScrollArea className="flex-1 -mx-6 px-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-4 border-b border-gray-200">
            <Image
              src={item.images[0]}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">Taglia: {item.size}</p>
              <p className="font-semibold">€{item.price}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Totale</span>
          <span className="font-semibold">€{totalPrice}</span>
        </div>
        <Button className="w-full bg-red-600 hover:bg-red-700">
          Procedi al checkout
        </Button>
      </div>
    </div>
  )
}

