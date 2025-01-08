"use client"

import { motion } from "framer-motion"
import ProductCard from "./Card"
import { CartItem } from "@/hooks/useCart"
import { Product } from "../page"

interface Props {
  products: CartItem[] | Product[] 
}

export default function AlternatingCards({ products }: Props) {
  if(!products || products.length < 1) return <div></div>
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 my-36 pb-36">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:gap-y-8 relative">
        {/* Prima card - sinistra */}
        <motion.div
          className="col-span-1 h-[300px] overflow-visible"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ProductCard product={products[0]} variant="background" />
        </motion.div>
        <div className="col-span-1 h-[300px] overflow-visible" /> {/* Spazio vuoto */}

        {/* Seconda card - destra */}
        <div className="col-span-1 h-[300px] overflow-visible" /> {/* Spazio vuoto */}
        <motion.div
          className="col-span-1 h-[300px] overflow-visible"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProductCard product={products[1]} variant="background" />
        </motion.div>

        {/* Terza card - sinistra */}
        <motion.div
          className="col-span-1 h-[300px] overflow-visible"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ProductCard product={products[2]} variant="background" />
        </motion.div>
        <div className="col-span-1 h-[300px] overflow-visible" /> {/* Spazio vuoto */}
      </div>
    </div>
  )
}

