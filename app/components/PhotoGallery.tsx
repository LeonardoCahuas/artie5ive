"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Trasformazioni per l'effetto ventaglio
  const rotate1 = useTransform(scrollYProgress, [0.1, 0.3], [-30, -15])
  const rotate2 = useTransform(scrollYProgress, [0.1, 0.3], [0, 0])
  const rotate3 = useTransform(scrollYProgress, [0.1, 0.3], [30, 15])
  
  const x1 = useTransform(scrollYProgress, [0.1, 0.3], [-20, -60])
  const x3 = useTransform(scrollYProgress, [0.1, 0.3], [20, 60])

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-screen overflow-hidden"
    >
      <div className="sticky top-0 flex items-center justify-center">
        <div className="relative w-full">
          <div className="w-full h-[70vw] md:h-[70vh] flex flex-row items-center justify-center">
            {/* Foto sinistra del ventaglio */}
            <motion.div 
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[40%] md:w-[30%] lg:w-[25%] aspect-[3/4] origin-bottom"
              initial={{ rotate: -45, x: -20, opacity: 0 }}
              animate={{ rotate: -30, x: -20, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ rotate: rotate1, x: x1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            >
              <div className="relative w-full h-full group">
                <Image
                  src="/artie1.jpg"
                  alt="Artie 1"
                  fill
                  className="object-cover rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  sizes="(max-width: 768px) 45vw, 35vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300 rounded-2xl" />
              </div>
            </motion.div>

            {/* Foto centrale del ventaglio */}
            <motion.div 
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[40%] md:w-[30%] lg:w-[25%] aspect-[3/4] origin-bottom z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ rotate: rotate2 }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
            >
              <div className="relative w-full h-full group">
                <Image
                  src="/artie2.jpg"
                  alt="Artie 2"
                  fill
                  className="object-cover rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  sizes="(max-width: 768px) 45vw, 35vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300 rounded-2xl" />
              </div>
            </motion.div>

            {/* Foto destra del ventaglio */}
            <motion.div 
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[40%] md:w-[30%] lg:w-[25%] aspect-[3/4] origin-bottom"
              initial={{ rotate: 45, x: 20, opacity: 0 }}
              animate={{ rotate: 30, x: 20, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ rotate: rotate3, x: x3 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            >
              <div className="relative w-full h-full group">
                <Image
                  src="/artie3.jpg"
                  alt="Artie 3"
                  fill
                  className="object-cover rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  sizes="(max-width: 768px) 45vw, 35vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300 rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

