"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Footer } from "../components/Footer"
import { useParams } from "next/navigation"
import { CartItem, useCart } from "@/hooks/useCart"
import { cartLinesAdd as addToShopifyCart, cartCreate } from "@/lib/shopify"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Metadata } from "next"

const metadata: Metadata = {
  title: {
    default: "Artie 5ive | Starsnation",
    template: "%s | Artie 5ive",
  },
  description:
    "Artie 5ive, rapper italiano firmato con 5STARSNATION. Scopri la sua musica, i suoi ultimi singoli e album.",
  keywords: ["Artie 5ive", "rapper italiano", "5STARSNATION", "hip hop italiano", "rap italiano", "musica italiana"],
  authors: [{ name: "Artie 5ive" }],
  creator: "Artie 5ive",
  publisher: "5STARSNATION",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://starsnation.it",
    siteName: "Artie 5ive Official Website",
    title: "Artie 5ive | Rapper Italiano | 5STARSNATION",
    description:
      "Artie 5ive, rapper italiano dalla periferia di Milano. Scopri il suo nuovo merch, la sua musica, i suoi ultimi singoli e album.",
    images: [
      {
        url: "/Logo artie.svg",
        width: 1200,
        height: 630,
        alt: "Artie 5ive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artie 5ive | Rapper Italiano",
    description:
      "Artie 5ive, rapper italiano dalla periferia di Milano. Scopri il suo nuovo merch, la sua musica, i suoi ultimi singoli e album.",
    images: ["//Logo artie.svg"],
  },
  icons: {
    icon: "/Logo artie.svg",
    shortcut: "/Logo artie.svg",
    apple: "/Logo artie.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/Logo artie.svg",
    },
  },
  manifest: "/site.webmanifest",
  category: "music",
}
if(metadata){}
export default function ProductPage() {
  const { products, checkoutId, addItem, setCheckoutId } = useCart()
  const [bambolaColor, setBambolaColor] = useState<"black" | "white">("black")
  const [maleducataColor, setMaleducataColor] = useState<"black" | "white">("black")
  const [selectedVariant, setSelectedVariant] = useState("")
  const params = useParams()
  const { product } = params

  const PRODUCT_COMBINATIONS = {
    BAMBOLA_BLACK_MALEDUCATA_BLACK: "9922998763786",
    BAMBOLA_BLACK_MALEDUCATA_WHITE: "9923052110090",
    BAMBOLA_WHITE_MALEDUCATA_BLACK: "9923051880714",
    BAMBOLA_WHITE_MALEDUCATA_WHITE: "9922998108426",
  }
  let isPromoProduct 
  if (typeof product == 'string') {
    isPromoProduct = Object.values(PRODUCT_COMBINATIONS).includes(product)
  }
  const getCurrentProductId = () => {
    const key = `BAMBOLA_${bambolaColor.toUpperCase()}_MALEDUCATA_${maleducataColor.toUpperCase()}` as keyof typeof PRODUCT_COMBINATIONS
    return PRODUCT_COMBINATIONS[key]
  }
  let currentProduct: CartItem | undefined
  if (typeof product == 'string') {
  currentProduct = isPromoProduct ? products.find((p) => p.id.includes(getCurrentProductId())) : products.find((p) => p.id.includes(product))}

  const getAvailableVariants = () => {
    return currentProduct
      ? currentProduct.variants.filter((variant: { available: boolean }) => variant.available)
      : []
  }

  const availableVariants = getAvailableVariants()

  useEffect(() => {
    if (availableVariants.length > 0) {
      const firstAvailableVariant = availableVariants[0].id
      setSelectedVariant(firstAvailableVariant)
    } else {
      setSelectedVariant("")
    }
  }, [bambolaColor, maleducataColor, products])

  if (!currentProduct) {
    return <div>Prodotto non trovato.</div>
  }

  const addToCart = async () => {
    if (!checkoutId) {
      const checkoutResponse = await cartCreate()
      setCheckoutId(checkoutResponse.data.cartCreate.cart.id)
      return
    }

    const selVar = currentProduct.variants.find((v: { id: string }) => v.id === selectedVariant)

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

  return (
    <main className="min-h-screen bg-black text-white pt-36">
      <Link href="/" className="inline-flex items-center text-white hover:text-gray-300 m-4">
        <ArrowLeft className="mr-2" />
        Indietro
      </Link>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 px-4">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square relative overflow-hidden rounded-lg"
          >
            <Image
              src={currentProduct.images[0] || "/placeholder.svg"}
              alt={currentProduct.name}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </div>
        <div className="space-y-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            {currentProduct.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold"
          >
            €{currentProduct.price.toFixed(2)}
          </motion.p>

          {isPromoProduct ? (
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
                <Select onValueChange={(value: "black" | "white") => setMaleducataColor(value)} value={maleducataColor}>
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
                <Select value={selectedVariant} onValueChange={(value) => setSelectedVariant(value)}>
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
          ) : (
            <div className="space-y-2">
              <p className="text-white text-sm">Taglia</p>
              <Select value={selectedVariant} onValueChange={(value) => setSelectedVariant(value)}>
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
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={addToCart}
            className={`w-full py-3 rounded-md font-semibold flex items-center justify-center ${!selectedVariant ? "bg-gray-400 text-white" : "bg-white text-black"
              }`}
            disabled={!selectedVariant}
          >
            <ShoppingCart className="mr-2" />
            Aggiungi al carrello
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Dettagli del Prodotto</h2>
            <p className="font-bold">Tempi spedizione: 15 giorni lavorativi</p>
            <p className="font-bold">Costo spedizione: inclusa nel prezzo</p>
          </motion.div>
        </div>


      </div>
      <Footer />
    </main>
  )
}