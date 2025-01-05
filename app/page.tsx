"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./components/Card"
import { ScrollSection } from "./components/ScrollSection"
import { Footer } from "./components/Footer"
import { VideoCard } from "./components/VideoCard"
import img1 from '../public/barca.png'
import img2 from '../public/barcaback.png'
import img3 from '../public/real.png'
import img4 from '../public/realback.png'
import BottomBadge from "./components/BootmBadge"

// Mock products data
const products = [
  {
    id: "1",
    name: "T-Shirt Trap Nation",
    price: 39.99,
    images: [img1, img2],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "T-Shirt Trap Nation",
    price: 39.99,
    images: [img3, img4],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    name: "T-Shirt Trap Nation",
    price: 39.99,
    images: [img3, img4],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "4",
    name: "T-Shirt Trap Nation",
    price: 39.99,
    images: [img1, img2],
    sizes: ["S", "M", "L", "XL"]
  }
]

// YouTube video IDs
const featuredVideos = [
  { id: "1", videoId: "WTdrxp7B1q4", title: "5IVE MOMENTS EP.05" },
  { id: "2", videoId: "XcyPopxjyyM", title: "5IVE MOMENTS EP.04" },
]

const vlogVideos = [
  { id: "1", videoId: "WTdrxp7B1q4", title: "5IVE MOMENTS EP.05" },
  { id: "2", videoId: "XcyPopxjyyM", title: "5IVE MOMENTS EP.04" },
  { id: "3", videoId: "H4a2hNYi_qA", title: "5IVE MOMENTS EP.03" },
  { id: "4", videoId: "92QRDmigQF0", title: "5IVE MOMENTS EP.02" },
  { id: "5", videoId: "8pEmzsJ6JQc", title: "5IVE MOMENTS EP.01" },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative bruno-ace-regular">
      <div className="relative w-full">
       {/*  <ScrollSection
          backgroundImage="/bgimage1.png"
          className="min-h-screen bg-black/50 w-full flex flex-col"
        >
          <div className="flex flex-col justify-end flex-1 p-8"> 
            <div className="flex flex-row justify-between items-end">
              <div className="flex flex-col justify-between items-start">
                <div className="flex items-center">
                  <Music className="text-white text-4xl" />
                </div>
                <span className="text-white text-4xl">Stream Now →</span>
              </div>
              <div className="text-center flex flex-col items-end">
                <div className="grid grid-cols-2 gap-2 w-fit"> 
                  <div className="flex justify-center">
                    <Instagram className="text-white w-8 h-8" />
                  </div>
                  <div className="flex justify-center">
                    <Facebook className="text-white w-8 h-8" />
                  </div>
                  <div className="flex justify-center">
                    <Youtube className="text-white w-8 h-8" />
                  </div>
                  <div className="flex justify-center">
                    <Twitter className="text-white w-8 h-8" />
                  </div>
                </div>
                <span className="text-white text-3xl">Seguici sui social</span>
              </div>
            </div>
          </div>
        </ScrollSection> */}

        <ScrollSection
          backgroundImage="/bgimage1.png"
          className="min-h-screen bg-black/50 w-full pt-12 flex flex-col items-center"
        >
          <div className="container w-full lg:w-[60%] px-4 py-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-8 w-full text-center"
            >
              MERCH
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 mx-auto">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="my-12"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
          <BottomBadge />
        </ScrollSection>

        <ScrollSection
          backgroundImage="/bgimage2.png"
          className="min-h-screen bg-black/50 h-full"
        >
          <div className="container mx-auto px-4 py-16 h-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white text-center"
            >
              FEATURED VIDEOS
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={index === 0 ? "lg:col-span-2" : ""}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </div>
          </div>
          <BottomBadge />
        </ScrollSection>

        <ScrollSection
          backgroundImage="/bgimage3.png"
          className="min-h-screen bg-black/50 w-full pb-36"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-12 text-center"
            >
              5IVE MOMENTS
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

