'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

/**
 * Interface para representar um produto no carrinho
 */
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

/**
 * Interface para o contexto do carrinho
 */
interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getTotalItems: () => number
  getTotalPrice: () => number
  clearCart: () => void
}

/**
 * Criação do contexto do carrinho
 */
const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * Provider do contexto do carrinho
 * Gerencia o estado global do carrinho de compras
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  /**
   * Adiciona um produto ao carrinho
   * Se o produto já existir, incrementa a quantidade
   */
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        // Se já existe, incrementa a quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      // Se não existe, adiciona novo item
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  /**
   * Remove um produto completamente do carrinho
   */
  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  /**
   * Atualiza a quantidade de um produto no carrinho
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  /**
   * Retorna o total de itens no carrinho
   */
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  /**
   * Retorna o preço total do carrinho
   */
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  /**
   * Limpa todo o carrinho
   */
  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 * Hook personalizado para usar o contexto do carrinho
 * Garante que o contexto está disponível
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
