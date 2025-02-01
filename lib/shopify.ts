import axios from 'axios';

// Shopify GraphQL endpoint
const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

// Access token for Shopify Storefront API
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Axios instance for Shopify API requests
const shopifyClient = axios.create({
  baseURL: SHOPIFY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
  },
});

/**
 * Create a new cart
 */
export async function cartCreate() {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyClient.post('', { query });
  return response.data;
}

// Function to get all collections with their products
export async function getCollections() {
  const query = `
    {
      collections(first: 20) {
        edges {
          node {
            id
            title
            description
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 10) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await shopifyClient.post('', { query });
  return response.data;
}

/**
 * Add lines (products) to a cart
 * @param cartId The ID of the cart
 * @param lines An array of line items (variantId and quantity)
 */
export async function cartLinesAdd(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { cartId, lines };
  const response = await shopifyClient.post('', { query, variables });
  return response.data;
}

/**
 * Update lines in a cart
 * @param cartId The ID of the cart
 * @param lines An array of line items with updated quantity
 */
export async function cartLinesUpdate(cartId: string, lines: { id: string; quantity: number }[]) {
  const query = `
    mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { cartId, lines };
  const response = await shopifyClient.post('', { query, variables });
  return response.data;
}

/**
 * Remove lines from a cart
 * @param cartId The ID of the cart
 * @param lineIds An array of line item IDs to remove
 */
export async function cartLinesRemove(cartId: string, lineIds: string[]) {
  const query = `
    mutation ($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { cartId, lineIds };
  const response = await shopifyClient.post('', { query, variables });
  return response.data;
}

/**
 * Fetch cart details by ID
 * @param cartId The ID of the cart
 */
export async function cartFetch(cartId: string) {
  const query = `
    query ($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
              quantity
            }
          }
        }
      }
    }
  `;

  const variables = { cartId };
  const response = await shopifyClient.post('', { query, variables });
  console.log(response)
  return response.data;
}

/**
 * Clear the cart by removing all lines
 * @param cartId The ID of the cart
 */
export async function cartLineUpdateQuantity(cartId: string, lineId: string | undefined, quantity: number) {
  const query = `
    mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { cartId, lines: [{ id: lineId, quantity }] };
  const response = await shopifyClient.post('', { query, variables });
  return response.data;
}

/**
 * Remove all quantities of a specific line item in the cart
 * @param cartId The ID of the cart
 * @param lineId The ID of the line item to remove
 */
export async function cartLineRemoveAll(cartId: string, lineId: string) {
  return cartLinesRemove(cartId, [lineId]);
}

export async function cartClear(cartId: string) {
  const cart = await cartFetch(cartId);
  const lineIds = cart.data.cart.lines.edges.map((edge: { node: { id: string; }; }) => edge.node.id);
  return cartLinesRemove(cartId, lineIds);
}

/**
 * Fetch a single product not in collections
 */
export async function getSingleProduct() {
  const query = `
    {
      product(id: "gid://shopify/Product/9922996306186") {
        id
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
            }
          }
        }
      }
    }
  `;
  
  const response = await shopifyClient.post('', { query });
  return response.data;
}
export async function getMultipleProducts() {
  const query = `
    {
      nodes(ids: [
        "gid://shopify/Product/9922998763786", 
        "gid://shopify/Product/9922998108426"
      ]) {
        ... on Product {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                src
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyClient.post("", { query });
  return response.data.data.nodes; // Restituisce un array con i due prodotti
}
