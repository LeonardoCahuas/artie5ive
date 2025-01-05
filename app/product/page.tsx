"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '../components/Footer'

// Mock product data
const product = {
  id: "1",
  name: "T-Shirt Trap Nation",
  price: 39.99,
  images: ["/barca.png", "/real.png", "/barcaback.png", "/realback.png"],
  sizes: ["S", "M", "L", "XL"]
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')

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
              src={product.images[selectedImage]} 
              alt={product.name} 
              layout="fill" 
              objectFit="cover"
            />
          </motion.div>
          <div className="flex space-x-2 overflow-x-auto py-8 px-8">
            {product.images.map((img, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer ${
                  selectedImage === index ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image src={img} alt={`${product.name} ${index + 1}`} layout="fill" objectFit="cover" />
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
            {product.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold"
          >
            ${product.price.toFixed(2)}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Select Size</h2>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md ${
                    selectedSize === size ? 'bg-white text-black' : 'bg-gray-800'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-black py-3 rounded-md font-semibold flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Product Details</h2>
            <p>
              This premium T-Shirt from Trap Nation is crafted with 100% organic cotton for ultimate comfort and style. 
              The fabric is soft, breathable, and perfect for everyday wear or special events.
            </p>
            <h3 className="text-lg font-semibold">Material & Care</h3>
            <ul className="list-disc list-inside">
              <li>100% Organic Cotton</li>
              <li>Machine wash cold</li>
              <li>Tumble dry low</li>
              <li>Do not bleach</li>
            </ul>
            <h3 className="text-lg font-semibold">Sizing Guide</h3>
            <p>
              Our T-Shirts have a regular fit. If you prefer a looser fit, we recommend sizing up. 
              Please refer to our size chart for detailed measurements.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer/>
    </main>
  )
}

