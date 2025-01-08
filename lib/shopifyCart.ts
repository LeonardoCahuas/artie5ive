export async function createCart() {
  const res = await fetch(`/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to create cart')
  }

  const cart = await res.json()
  return cart
}

export async function addToCart(variantId: string, quantity: number) {
  const res = await fetch(`/api/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      variantId,
      quantity
    })
  })

  if (!res.ok) {
    throw new Error('Failed to add to cart')
  }

  const cart = await res.json()
  return cart
}

export async function removeFromCart(lineId: string) {
  const res = await fetch(`/api/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lineId
    })
  })

  if (!res.ok) {
    throw new Error('Failed to remove from cart')
  }

  const cart = await res.json()
  return cart
}

export async function updateCart(lineId: string, quantity: number) {
  const res = await fetch(`/api/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lineId,
      quantity
    })
  })

  if (!res.ok) {
    throw new Error('Failed to update cart')
  }

  const cart = await res.json()
  return cart
}

export async function getCart() {
  const res = await fetch(`/api/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to get cart')
  }

  const cart = await res.json()
  return cart
}
