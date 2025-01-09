import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem, useCart } from "@/hooks/useCart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cartLinesAdd as addToShopifyCart, cartCreate } from "@/lib/shopify";
import { Product } from "../page";

interface Variant {
  id: string
  size: string
  available: boolean
}

function ProductCard({ product, variant }: { product: Product | CartItem, variant: 'default' | 'background' }) {
  const { addItem } = useCart();
  const availableVariants = product.variants.filter((variant: { available: boolean; }) => variant.available)
  const [selectedVariant, setSelectedVariant] = useState(availableVariants[0]?.id || '');
  const [currentImage, setCurrentImage] = useState(0)
  const { checkoutId, setCheckoutId } = useCart()

  const addToCart = async () => {
    if (checkoutId) {
      if (selectedVariant) {
        const selVar = product.variants.find((v: { id: string;size:string }) => v.id == selectedVariant)
        const resp = await addToShopifyCart(checkoutId, [{ merchandiseId: selVar.id, quantity: 1 }])
        const lineId = resp.data.cartLinesAdd.cart.lines.edges[0].node.id;

        addItem({
          id: product.id,
          variantId: selVar.id,
          name: product.name,
          price: product.price,
          size: selVar.size,
          images: product.images,
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
  };

  const extractProductId = (id: string) => {
    const match = id.match(/\/(\d+)$/); // Cerca solo la parte finale dell'ID
    return match ? match[1] : ''; // Restituisce solo l'ID numerico, altrimenti una stringa vuota
  };

  return (
    <div className="flex flex-col items-center">

      {variant === 'background' ? (
        <div className="relative w-full aspect-[2/3] max-w-[300px]">
          {(availableVariants.length < 1 || !selectedVariant) && <p className="bg-red-600 rounded-sm px-1">Sold out</p>}
          <Link href={`/${extractProductId(product.id)}`}><Card className="overflow-hidden bg-transparent border-none h-full" style={{ backgroundImage: `url(${product.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Contenuto della card è ora vuoto */}
          </Card></Link>
          <CardContent className="p-4 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-white text-center">{product.name.toUpperCase()}</h3>
            <p className="text-xl text-white font-light mb-4">€{product.price.toFixed(2)}</p>
            <Button
              className="bg-[#c1272d] hover:bg-red-700"
              disabled={availableVariants.length < 1 || !selectedVariant}
              onClick={() => {
                if (selectedVariant) {
                  addToCart();
                }
              }}
            >
              Aggiungi
            </Button>
          </CardContent>
        </div>
      ) : (
        <Card className="group overflow-hidden bg-transparent border-none max-w-[300px]">
          <CardContent className="p-0">
            <Link href={`/${extractProductId(product.id)}`}>
              <div className="relative aspect-square">
                <Image
                  src={product.images[currentImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onMouseEnter={() => {
                    if (product.images.length > 1) {
                      setCurrentImage(1);
                    }
                  }}
                  onMouseLeave={() => {
                    setCurrentImage(0);
                  }}
                />
              </div>
            </Link>
            <div className="p-4 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-2 text-white text-center">{product.name.toUpperCase()}</h3>
              <p className="text-xl text-white font-light mb-4">€{product.price.toFixed(2)}</p>
              {availableVariants.length === 0 ? (
                <p className="text-red-500">Sold Out</p>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  {availableVariants.length > 1 ? (
                    <Select onValueChange={(v) => { setSelectedVariant(v) }} value={selectedVariant}>
                      <SelectTrigger className="flex-1 bg-transparent text-white border border-2 border-white">
                        <SelectValue placeholder="Seleziona taglia" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVariants.map((variant: Variant) => (
                          <SelectItem key={variant.id} value={variant.id}>
                            {variant.size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                  <Button
                    className="bg-[#c1272d] hover:bg-red-700"
                    disabled={availableVariants.length < 1 || !selectedVariant}
                    onClick={addToCart}
                  >
                    Aggiungi
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ProductCard;
