"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
/* import ProductCard from "./components/Card" */
import { ScrollSection } from "./components/ScrollSection"
import { Footer } from "./components/Footer"
import { VideoCard } from "./components/VideoCard"
import { getCollections } from "@/lib/shopify"
import BottomBadge from "./components/BootmBadge"
/* import AlternatingCards from "./components/Cards"
import { PhotoGallery } from "./components/PhotoGallery" */
import { useCart } from "@/hooks/useCart"
import { Metadata } from "next"
import Image from "next/image"
import moments from '../public/Logo 5ive moments.svg'

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
    apple: '/',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/Logo artie.svg',
    },
  },
  manifest: '/site.webmanifest',
  category: 'music',
}

if(metadata){}

interface Variant {
  id: string;
  size: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  variants: Variant[];
  sizes: string[]
}




const vlogVideos = [
  { id: "1", videoId: "WTdrxp7B1q4", title: "5IVE MOMENTS EP.05" },
  { id: "2", videoId: "XcyPopxjyyM", title: "5IVE MOMENTS EP.04" },
  { id: "3", videoId: "H4a2hNYi_qA", title: "5IVE MOMENTS EP.03" },
  { id: "4", videoId: "92QRDmigQF0", title: "5IVE MOMENTS EP.02" },
  { id: "5", videoId: "8pEmzsJ6JQc", title: "5IVE MOMENTS EP.01" },
]

export default function Home() {
  const { setProducts } = useCart()
  const [collA, setCollA] = useState<Product[]>([])
  const [collB, setCollB] = useState<Product[]>([])
console.log(collA)
console.log(collB)
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getCollections();
      if (response.data.collections.edges.length > 0) {
        const collections = response.data.collections.edges;

        // Assicurati che ci siano almeno due collezioni
        if (collections.length >= 2) {
          const firstCollection = collections[0].node;
          const secondCollection = collections[1].node;
          const collectionA = firstCollection.products.edges.map((edge: { node: { id: string; title: string; variants: { edges: {node:{id:string;title: string;availableForSale: boolean}}[] }; images: { edges: {node:{src:string}}[] }; priceRange: { minVariantPrice: { amount: string } } } }) => ({
            id: edge.node.id,
            name: edge.node.title,
            variants: edge.node.variants.edges.map(variant => {
              return ({
                id: variant.node.id,
                size: variant.node.title,
                available: variant.node.availableForSale,
              })
            }),
            images: edge.node.images.edges.map(image => image.node.src),
            price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
          }))

          const collectionB = secondCollection.products.edges.map((edge: { node: { id: string; title: string; priceRange: { minVariantPrice: { amount: string } }; variants: { edges: { node: { id: string; title: string; availableForSale: boolean } }[] }; images: { edges: {node:{src:string}}[] } } }) => ({
            id: edge.node.id,
            name: edge.node.title,
            price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
            variants: edge.node.variants.edges.map((variant: { node: { id: string; title: string; availableForSale: boolean } }) => ({
              id: variant.node.id,
              size: variant.node.title,
              available: variant.node.availableForSale,
            })),
            images: edge.node.images.edges.map(image => image.node.src),
          }))
          setCollA(collectionA);
          setCollB(collectionB);
        }

        const allProducts = collections.flatMap((collection: { node: { products: { edges: {node: {variants:{edges:{ node: { id: string; title: string; availableForSale: boolean } }[]};images:{edges:{ node: { src: string }}[]}; id:string;title:string; priceRange:{minVariantPrice:{amount:string}}}}[] } } }) =>
          collection.node.products.edges.map(edge => ({
            id: edge.node.id,
            name: edge.node.title,
            price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
            images: edge.node.images.edges.map((image: { node: { src: string } }) => image.node.src),
            variants: edge.node.variants.edges.map((variant: { node: { id: string; title: string; availableForSale: boolean } }) => ({
              id: variant.node.id,
              size: variant.node.title,
              available: variant.node.availableForSale,
            })),
          }))
        );
        setProducts(allProducts);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="relative bruno-ace-regular">
      <div className="relative w-full">
        {/*<ScrollSection
          backgroundImage="/bgimage1.png"
          className="min-h-screen bg-black/50 w-full pt-12 flex flex-col items-center"
          backgroundClass="bg-cover bg-center"
        >
          <div className="container w-full lg:w-[60%] px-4 py-36">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-8 w-full text-center"
            >
              MERCH
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 mx-auto">
              {collA.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="my-12"
                >
                  <ProductCard product={product} variant="default" />
                </motion.div>
              ))}
            </div>
          </div>
          <BottomBadge />
        </ScrollSection>

        <ScrollSection
          backgroundImage="/bgimage2.png"
          className="min-h-screen bg-black/50 h-full"
          backgroundClass="bg-cover bg-center"
        >
          <div className="container mx-auto py-36 h-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white text-center mb-16"
            >
              COLLAB STRIPS
            </motion.h2>
            <PhotoGallery />
            <AlternatingCards products={collB} />
          </div>
          <BottomBadge />
        </ScrollSection>*/}

        <ScrollSection
          backgroundImage="/bgimage3.png"
          className="min-h-screen bg-black/50 w-full py-36"
          backgroundClass="bg-cover bg-center"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-12 text-center flex flex-col items-center w-full p-3"

            >
              <Image src={moments} alt="%ive moments logo" width={350}/>
            </motion.h2>
            <motion.div
              key={vlogVideos[0].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 * 0.1 }}
              className="mb-6"
            >
              <VideoCard isSmall={false} video={vlogVideos[0]} />
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vlogVideos.slice(1).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VideoCard isSmall video={video} />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <BottomBadge />
          </div>
        </ScrollSection>

        <Footer />
      </div>
    </main>
  )
}


