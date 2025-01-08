"use client"

import {   useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '../components/Footer'
import { useParams } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { cartLinesAdd as addToShopifyCart, cartCreate } from "@/lib/shopify";
import { Metadata } from 'next'

// Metadata per SEO
const metadata: Metadata = {
  title: {
    default: 'Artie 5ive | Starsnation',
    template: '%s | Artie 5ive'
  },
  description: 'Artie 5ive, rapper italiano firmato con Trenches Records Entertainment. Scopri la sua musica, i suoi ultimi singoli e album.',
  keywords: ['Artie 5ive', 'rapper italiano', 'Trenches Records', 'hip hop italiano', 'rap italiano', 'musica italiana'],
  authors: [{ name: 'Artie 5ive' }],
  creator: 'Artie 5ive',
  publisher: 'Trenches Records Entertainment',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://starsnation.it',
    siteName: 'Artie 5ive Official Website',
    title: 'Artie 5ive | Rapper Italiano | Trenches Records',
    description: 'Artie 5ive, rapper italiano dalla periferia di Milano. Scopri il suo nuovo merch, la sua musica, i suoi ultimi singoli e album.',
    images: [
      {
        url: '/Logo artie.svg',
        width: 1200,
        height: 630,
        alt: 'Artie 5ive',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artie 5ive | Rapper Italiano',
    description: 'Artie 5ive, rapper italiano dalla periferia di Milano. Scopri il suo nuovo merch, la sua musica, i suoi ultimi singoli e album.',
    images: ['//Logo artie.svg'],
  },
  icons: {
    icon: '/Logo artie.svg',
    shortcut: '/Logo artie.svg',
    apple: '/Logo artie.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/Logo artie.svg',
    },
  },
  manifest: '/site.webmanifest',
  category: 'music',
}

if(metadata){}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const { products, checkoutId, addItem, setCheckoutId } = useCart()
  const params = useParams()
  const { product } = params

  // Assicurati che product sia una stringa
  const productId = Array.isArray(product) ? product[0] : product;
  const item = products.find(p => p.id.includes(productId));
  const [selectedSize, setSelectedSize] = useState(!item ? '' : item.variants.length > 1 ? { id: "", size: "" } : item.variants[0])

  if (!item) {
    return <div>Prodotto non trovato.</div>;
  }

  const addToCart = async () => {
    if (checkoutId) {
      if (selectedSize && item) {
        const resp = await addToShopifyCart(checkoutId, [{ merchandiseId: selectedSize.id, quantity: 1 }]);
        const lineId = resp.data.cartLinesAdd.cart.lines.edges[0].node.id;
        addItem({
          id: item.id,
          variantId: selectedSize.id,
          name: item.name,
          price: item.price,
          size: selectedSize.size,
          images: item.images,
          quantity: 1,
          lineId: lineId,
          variants: undefined
        });
      } else {
        console.error("Selected variant is not valid.");
      }
    } else {
      const checkoutResponse = await cartCreate();
      setCheckoutId(checkoutResponse.data.cartCreate.cart.id);
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
              src={item.images[selectedImage]}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <div className="flex space-x-2 overflow-x-auto py-8 px-8">
            {item.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-2 ring-white' : ''
                  }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image src={img} alt={`${item.name} ${index + 1}`} layout="fill" objectFit="cover" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            {item.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold"
          >
            ${item.price.toFixed(2)}
          </motion.p>
          {item.variants.length > 1 && <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Seleziona taglia</h2>
            <div className="flex space-x-2">
              {item.variants.filter((variant: { available: boolean; }) => variant.available).map((v: { size: string }) => (
                <motion.button
                  key={v.size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md ${selectedSize.size === v.size ? 'bg-white text-black' : 'bg-gray-800'
                    }`}
                  onClick={() => setSelectedSize(v)}
                >
                  {v.size}
                </motion.button>
              ))}
            </div>
          </motion.div>}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className={`w-full py-3 rounded-md font-semibold flex items-center justify-center ${(!selectedSize.size || item.variants.filter((variant: { available: boolean; }) => variant.available).length < 1) ? 'bg-gray-400 text-white' : 'bg-white text-black'}`}
            disabled={!selectedSize.size || item.variants.filter((variant: { available: boolean; }) => variant.available).length < 1}
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
            <p className="font-bold">Tempi spedizione: 10-15 giorni lavorativi</p>
            <p className="font-bold">Costo spedizione: 10€</p>
            <p>
              T-Shirt premium di Trap Nation in 100% cotone biologico, morbida e traspirante, ideale per ogni occasione.
            </p>
            <h3 className="text-lg font-semibold">Materiale & Cura</h3>
            <ul className="list-disc list-inside">
              <li>100% Cotone Biologico</li>
              <li>Lavare in lavatrice a freddo</li>
              <li>Asciugare a bassa temperatura</li>
              <li>Non candeggiare</li>
            </ul>
            <h3 className="text-lg font-semibold">Guida alle Taglie</h3>
            <p>
              Vestibilità regolare. Se preferisci una vestibilità più ampia, ti consigliamo di scegliere una taglia in più.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

