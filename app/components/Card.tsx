"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/useCart"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    images: StaticImageData[]
    sizes: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [currentImage, setCurrentImage] = useState(0)
  const { addItem } = useCart()

  return (
    <div className="flex flex-col items-center">
      <Card className="group overflow-hidden bg-transparent border-none max-w-[300px]">
        <CardContent className="p-0">
        <Link href="/product">
          <div className="relative aspect-square">
            <Image
              src={product.images[currentImage]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onMouseEnter={() => setCurrentImage(1)}
              onMouseLeave={() => setCurrentImage(0)}
            />
          </div>
          </Link>
          <div className="p-4 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-white text-center">{product.name.toUpperCase()}</h3>
            <p className="text-xl text-white font-light mb-4">€{product.price}</p>
            <div className="flex flex-col gap-2 w-full">
              <Select onValueChange={setSelectedSize} value={selectedSize}>
                <SelectTrigger className="flex-1 bg-transparent text-white border border-2 border-white">
                  <SelectValue placeholder="Seleziona taglia" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-[#c1272d] hover:bg-red-700"
                disabled={!selectedSize}
                onClick={() => {if(selectedSize) addItem({ ...product, size: selectedSize })}}
              >
                Aggiungi
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
  )
}

