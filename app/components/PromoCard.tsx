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

interface PromoProductCardProps {
  products: Product[]
  variant: "default" | "background"
}

// Mapping delle combinazioni di prodotti
const PRODUCT_COMBINATIONS = {
  BAMBOLA_BLACK_MALEDUCATA_BLACK: "9922998763786",
  BAMBOLA_BLACK_MALEDUCATA_WHITE: "9923052110090",
  BAMBOLA_WHITE_MALEDUCATA_BLACK: "9923051880714",
  BAMBOLA_WHITE_MALEDUCATA_WHITE: "9922998108426",
}

function PromoProductCard({ products }: PromoProductCardProps) {
  console.log(products)
  const { addItem } = useCart()
  const [bambolaColor, setBambolaColor] = useState<"black" | "white">("black")
  const [maleducataColor, setMaleducataColor] = useState<"black" | "white">("black")
  const [selectedVariant, setSelectedVariant] = useState("")
  const [currentImage, setCurrentImage] = useState(0)
  const { checkoutId, setCheckoutId } = useCart()

  // Trova il prodotto corrente basato sulla combinazione di colori
  const getCurrentProductId = () => {
    const key =
      `BAMBOLA_${bambolaColor.toUpperCase()}_MALEDUCATA_${maleducataColor.toUpperCase()}` as keyof typeof PRODUCT_COMBINATIONS
    return PRODUCT_COMBINATIONS[key]
  }

  const currentProduct = products.find((p) => p.id.includes(getCurrentProductId()))

  // Filtra le varianti disponibili in base ai colori selezionati
  const getAvailableVariants = () => {
    const currentProduct = products.find((p) => p.id.includes(getCurrentProductId()));
    return currentProduct
      ? currentProduct.variants.filter((variant: { available: boolean }) => variant.available)
      : [];
  };

  const availableVariants = getAvailableVariants();

  // Imposta la prima variante quando cambia uno dei colori
  useEffect(() => {
    if (availableVariants.length > 0) {
      const firstAvailableVariant = availableVariants[0].id;
      setSelectedVariant(firstAvailableVariant);
    } else {
      setSelectedVariant("");
    }
  }, [bambolaColor, maleducataColor, products]);

  // Aggiungi un useEffect per monitorare i cambiamenti di selectedVariant
  useEffect(() => {
    console.log("Selected variant changed:", selectedVariant);
  }, [selectedVariant]);

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
                    if (currentProduct?.images.length && currentProduct?.images.length > 1) {
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
                <p className="text-lg text-gray-400 line-through">€59,98</p>
              </div>

              <p className="text-white mb-4">1 Tee Bambola + 1 Tee Maleducata</p>

              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <p className="text-white text-sm">Colore Bambola</p>
                  <Select onValueChange={(value: "black" | "white") => setBambolaColor(value)} value={bambolaColor}>
                    <SelectTrigger className="w-[200px] bg-transparent text-white border-2 border-white">
                      <SelectValue placeholder="Seleziona colore" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-white text-sm">Colore Maleducata</p>
                  <Select
                    onValueChange={(value: "black" | "white") => setMaleducataColor(value)}
                    value={maleducataColor}
                  >
                    <SelectTrigger className="w-[200px] bg-transparent text-white border-2 border-white">
                      <SelectValue placeholder="Seleziona colore" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-white text-sm">Taglia (uguale per entrambe)</p>
                  <p className="text-white text-sm font-bold">Spedizione inclusa</p>
                  <Select value={selectedVariant} onValueChange={(value) => {
                    console.log("Selected variant:", value);
                    setSelectedVariant(value);
                  }}>
                    <SelectTrigger className="w-[200px] bg-transparent text-white border-2 border-white">
                      <SelectValue placeholder="Seleziona taglia" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVariants.map((variant: { id: string; size: string }) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="bg-white text-[#c1272d] px-8 w-full mt-4"
                disabled={!selectedVariant}
                onClick={addToCart}
              >
                Aggiungi al carrello
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PromoProductCard

