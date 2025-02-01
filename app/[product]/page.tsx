"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Footer } from "../components/Footer"
import { useParams } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { cartLinesAdd as addToShopifyCart, cartCreate, getCollections } from "@/lib/shopify"
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

if (metadata) {
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const { products, checkoutId, addItem, setCheckoutId } = useCart()
  const [isTshirt, setIsTshirt] = useState(false)
  const params = useParams()
  const { product } = params

  // Stati per la gestione del prodotto promo
  const [selectedColor, setSelectedColor] = useState<"black" | "white">("black")
  const [selectedVariant, setSelectedVariant] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getCollections()
      if (response.data.collections.edges.length > 0) {
        const collections = response.data.collections.edges

        if (collections.length >= 2) {
          const firstCollection = collections[0].node
          const secondCollection = collections[1].node
          const collectionA = firstCollection.products.edges.map((edge: { node: { id: string } }) => edge.node.id)
          const collectionB = secondCollection.products.edges.map((edge: { node: { id: string } }) => edge.node.id)

          if (collectionA.some((str: string) => typeof product == "string" && str.includes(product))) {
            setIsTshirt(true)
          } else if (collectionB.some((str: string) => typeof product == "string" && str.includes(product))) {
            setIsTshirt(false)
          }
        }
      }
    }
    fetchProducts()
  }, [product]) // Added product to the dependency array

  // Assicurati che product sia una stringa
  const productId = Array.isArray(product) ? product[0] : product
  const item = products.find((p) => p.id.includes(productId))
  const [selectedSize, setSelectedSize] = useState(
    !item ? "" : item.variants.length > 1 ? { id: "", size: "" } : item.variants[0],
  )

  // Verifica se il prodotto è uno dei due ID speciali
  const isPromoProduct = productId === "9922998763786" || productId === "9922998108426"

  // Se è un prodotto promo, trova i prodotti black e white
  const promoProducts = isPromoProduct
    ? products.filter((p) => p.id.includes("9922998763786") || p.id.includes("9922998108426"))
    : []

  const productBlack = promoProducts.find((p) => p.name.toLowerCase().includes("black"))
  const productWhite = promoProducts.find((p) => p.name.toLowerCase().includes("white"))
  const currentProduct = selectedColor === "black" ? productBlack : productWhite

  // Filtra le varianti disponibili per il prodotto promo corrente
  const availableVariants = currentProduct
    ? currentProduct.variants.filter((variant: { available: boolean }) => variant.available)
    : []

  // Imposta la prima variante quando cambia il colore per i prodotti promo
  useEffect(() => {
    if (isPromoProduct && availableVariants.length > 0) {
      setSelectedVariant(availableVariants[0].id)
    }
  }, [selectedColor])

  if (!item && !isPromoProduct) {
    return <div>Prodotto non trovato.</div>
  }

  const addToCart = async () => {
    if (!checkoutId) {
      const checkoutResponse = await cartCreate()
      setCheckoutId(checkoutResponse.data.cartCreate.cart.id)
      return
    }

    if (isPromoProduct) {
      if (selectedVariant && currentProduct) {
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
    } else if (selectedSize && item) {
      const resp = await addToShopifyCart(checkoutId, [{ merchandiseId: selectedSize.id, quantity: 1 }])
      const lineId = resp.data.cartLinesAdd.cart.lines.edges[0].node.id

      addItem({
        id: item.id,
        variantId: selectedSize.id,
        name: item.name,
        price: item.price,
        size: selectedSize.size,
        images: item.images,
        quantity: 1,
        lineId: lineId,
        variants: undefined,
      })
    }
  }

  const displayProduct = isPromoProduct ? currentProduct : item
  if (!displayProduct) return <div>Prodotto non trovato.</div>

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
              src={displayProduct.images[selectedImage] || "/placeholder.svg"}
              alt={displayProduct.name}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <div className="flex space-x-2 overflow-x-auto py-8 px-8">
            {displayProduct.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer ${selectedImage === index ? "ring-2 ring-white" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${displayProduct.name} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            {displayProduct.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold"
          >
            €{displayProduct.price.toFixed(2)}
          </motion.p>

          {isPromoProduct ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
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
                    {availableVariants.map((variant: { id: string; size: string }) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          ) : (
            item && item.variants.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">Seleziona taglia</h2>
                <div className="flex space-x-2">
                  {item.variants
                    .filter((variant: { available: boolean }) => variant.available)
                    .map((v: { size: string }) => (
                      <motion.button
                        key={v.size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-md ${selectedSize.size === v.size ? "bg-white text-black" : "bg-gray-800"}`}
                        onClick={() => setSelectedSize(v)}
                      >
                        {v.size}
                      </motion.button>
                    ))}
                </div>
              </motion.div>
            )
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className={`w-full py-3 rounded-md font-semibold flex items-center justify-center ${
              isPromoProduct
                ? !selectedVariant
                  ? "bg-gray-400 text-white"
                  : "bg-white text-black"
                : (
                      !selectedSize.size ||
                        (item && item.variants.filter((variant: { available: boolean }) => variant.available).length < 1)
                    )
                  ? "bg-gray-400 text-white"
                  : "bg-white text-black"
            }`}
            disabled={
              isPromoProduct
                ? !selectedVariant
                : !selectedSize.size ||
                  (item && item.variants.filter((variant: { available: boolean }) => variant.available).length < 1)
            }
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
            <p className="font-bold">Tempi spedizione: {isTshirt ? "15" : "30"} giorni lavorativi</p>
            <p className="font-bold">Spedizione compresa nel prezzo</p>
            {!isTshirt && <p className="font-bold">I cerottini sono spediti in scatole da 30.</p>}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

