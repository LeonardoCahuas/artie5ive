"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/useCart"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cartLinesAdd as addToShopifyCart, cartCreate } from "@/lib/shopify"
import type { Product } from "../page"

interface Variant {
  id: string
  size: string
  available: boolean
}

interface PromoProductCardProps {
  products: Product[]
  variant: "default" | "background"
}

function PromoProductCard({ products }: PromoProductCardProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState<"black" | "white">("black")
  const [selectedVariant, setSelectedVariant] = useState("")
  const [currentImage, setCurrentImage] = useState(0)
  const { checkoutId, setCheckoutId } = useCart()

  const productBlack = products.find((p) => p.name.toLowerCase().includes("black"))
  const productWhite = products.find((p) => p.name.toLowerCase().includes("white"))
  const currentProduct = selectedColor === "black" ? productBlack : productWhite

  const availableVariants = currentProduct
    ? currentProduct.variants.filter((variant: { available: boolean }) => variant.available)
    : []

  // Imposta la prima variante quando cambia il colore o quando il componente viene montato
  useEffect(() => {
    if (availableVariants.length > 0) {
      setSelectedVariant(availableVariants[0].id)
    }
  }, [selectedColor])

  const addToCart = async () => {
    if (!checkoutId || !currentProduct) {
      if (!checkoutId) {
        const checkoutResponse = await cartCreate()
        setCheckoutId(checkoutResponse.data.cartCreate.cart.id)
      }
      return
    }

    const selVar = currentProduct.variants.find((v: { id: string; size: string }) => v.id === selectedVariant)

    if (selVar) {
      const resp = await addToShopifyCart(checkoutId, [{ merchandiseId: selVar.id, quantity: 1 }])
      const lineId = resp.data.cartLinesAdd.cart.lines.edges[0].node.id

      addItem({
        id: currentProduct.id,
        variantId: selVar.id,
        name: currentProduct.name,
        price: currentProduct.price,
        size: selVar.size,
        images: currentProduct.images,
        quantity: 1,
        lineId: lineId,
        variants: undefined,
      })
    }
  }

  const extractProductId = (id: string) => {
    const match = id.match(/\/(\d+)$/)
    return match ? match[1] : ""
  }

  return (
    <Card className="group overflow-hidden bg-transparent border-2 border-[#c1272d] bg-[#c1272d] w-full rounded-lg">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Link href={`/${extractProductId(currentProduct?.id || "")}`} className="block">
              <div className="relative w-[200px] aspect-square">
                <Image
                  src={currentProduct?.images[currentImage] || "/placeholder.svg"}
                  alt={currentProduct?.name || "Product"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                  onMouseEnter={() => {
                    if (currentProduct?.images?.length && currentProduct?.images?.length > 1) {
                      setCurrentImage(1)
                    }
                  }}
                  onMouseLeave={() => {
                    setCurrentImage(0)
                  }}
                />
              </div>
            </Link>
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-xl text-white">{currentProduct?.name}</h3>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <p className="text-2xl text-white font-bold">€59,99</p>
                <p className="text-lg text-gray-400 line-through">€79,98</p>
              </div>

              <p className="text-white mb-4">1 Tee Bambola + 1 Tee Maleducata</p>

              <div className="flex flex-col gap-4">
                <Select onValueChange={(value: "black" | "white") => setSelectedColor(value)} value={selectedColor}>
                  <SelectTrigger className="w-[200px] bg-transparent text-white border-2 border-white">
                    <SelectValue placeholder="Seleziona colore" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedVariant} onValueChange={(value) => setSelectedVariant(value)}>
                  <SelectTrigger className="w-[200px] bg-transparent text-white border-2 border-white">
                    <SelectValue placeholder="Seleziona taglia" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVariants.map((variant: Variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button className="bg-white text-[#c1272d] px-8" disabled={!selectedVariant} onClick={addToCart}>
                  Aggiungi al carrello
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PromoProductCard

