'use client'

import React from 'react'
import { useCart } from '../contexts/CartContext'

/**
 * Interface para as propriedades do produto
 */
interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

/**
 * Componente ProductCard
 * Card individual de produto com imagem, nome, preço e botão de adicionar ao carrinho
 * Inclui efeito hover elegante com elevação suave
 */
export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  /**
   * Formata o preço para exibição em reais
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  /**
   * Adiciona o produto ao carrinho
   */
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 w-full flex flex-col h-full">
      {/* Container da imagem */}
      <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden shrink-0">
        {/* Placeholder da imagem */}
        <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="p-4 sm:p-4 md:p-5 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 min-h-[2.5rem] sm:min-h-[3rem]">
          {product.name}
        </h3>
        <p className="text-base sm:text-lg md:text-xl font-bold text-[#1FD9D8] mb-3 sm:mb-4 md:mb-5">
          {formatPrice(product.price)}
        </p>

        {/* Botão de adicionar ao carrinho */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 sm:py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-auto text-sm sm:text-base"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </div>
  )
}
