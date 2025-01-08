"use client"

import Image from "next/image"
import { CartItem, useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cartLineUpdateQuantity, cartLineRemoveAll, cartFetch, cartClear } from "@/lib/shopify"
import { Trash } from 'lucide-react'

export function CartSidebar() {
  const { items, removeItem, totalPrice, checkoutId, addItem, decreaseItem, clearCart } = useCart();
  const cartId = checkoutId; // Use the checkoutId as the cart ID

  // Function to handle quantity change
  const handleQuantityIncrease = async (item: CartItem) => {
    const lineId = item.lineId
    const quantity = item.quantity + 1
    await cartLineUpdateQuantity(cartId, lineId, quantity);
    addItem(item)
  };

  const handleQuantityDecrease = async (item: CartItem) => {
    const lineId = item.lineId
    const quantity = item.quantity - 1
    if (quantity < 0) return;
    await cartLineUpdateQuantity(cartId, lineId, quantity);
    decreaseItem(item); // Aggiorna lo stato locale
  };

  // Function to remove all quantities of a variant
  const handleRemoveAll = async (lineId: string) => {
    await cartLineRemoveAll(cartId, lineId);
    removeItem(lineId); // Update the store after removing from Shopify
  };

  // Function to proceed to checkout
  const handleCheckout = async () => {
    const cartDetails = await cartFetch(cartId);
    window.location.href = cartDetails.data.cart.checkoutUrl; // Redirect to checkout
  };

  // Funzione per svuotare il carrello
  const handleClearCart = async () => {
    await cartClear(cartId); // Svuota il carrello su Shopify
    clearCart(); // Svuota il carrello nello stato di Zustand
  };

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
          <div key={item.lineId} className="flex gap-4 py-4 border-b border-gray-200">
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
              <p className="font-semibold">Quantità: {item.quantity}</p>
              <p className="font-semibold">€{item.price * item.quantity}</p>
              <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-row gap-3">
                  <Button onClick={() => handleQuantityIncrease(item)}>+</Button>
                  <Button onClick={() => handleQuantityDecrease(item)}>-</Button>
                </div>
                <Button onClick={() => {if(item.lineId)handleRemoveAll(item.lineId)}}>
                  <Trash className="text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col gap-3">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Totale</span>
          <span className="font-semibold">€{totalPrice}</span>
        </div>
        <Button className="w-full bg-white text-red-600 border border-2 border-red-600 hover:bg-gray-100" onClick={handleClearCart}>
          Svuota Carrello
        </Button>
        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleCheckout}>
          Procedi al checkout
        </Button>
      </div>
    </div>
  )
}

