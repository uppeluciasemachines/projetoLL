'use client'

import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

/**
 * Interface para as propriedades do ProductGrid
 */
interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductGridProps {
  title: string
  products: Product[]
}

/**
 * Componente ProductGrid
 * Carrossel animado de produtos com navegação por setas e indicadores
 * - 4 produtos no desktop
 * - 3 produtos no tablet
 * - 2 produtos no mobile
 */
export default function ProductGrid({ title, products }: ProductGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(2)

  /**
   * Atualiza quantos itens mostrar baseado no tamanho da tela
   */
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(4) // Desktop: 4 produtos
      } else if (window.innerWidth >= 768) {
        setItemsToShow(3) // Tablet: 3 produtos
      } else {
        setItemsToShow(2) // Mobile: 2 produtos
      }
    }

    updateItemsToShow()
    window.addEventListener('resize', updateItemsToShow)
    return () => window.removeEventListener('resize', updateItemsToShow)
  }, [])

  /**
   * Calcula o índice máximo possível
   */
  const maxIndex = Math.max(0, products.length - itemsToShow)

  /**
   * Navega para o próximo conjunto de produtos
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  /**
   * Navega para o conjunto anterior de produtos
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  /**
   * Reseta o índice atual quando o número de itens visíveis muda
   * para evitar estados inconsistentes ao redimensionar a tela
   */
  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsToShow, products.length])

  /**
   * Carrossel automático a cada 8 segundos
   */
  useEffect(() => {
    if (maxIndex === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 sm:px-5 md:px-8 lg:px-10 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Título da seção com fonte infantil */}
        <h2 className="font-infantil text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 lg:mb-16 text-center px-4">
          {title}
        </h2>

        {/* Container do carrossel */}
        <div className="relative px-4 md:px-8 lg:px-12">
          {/* Botão anterior */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
              aria-label="Produtos anteriores"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#1FD9D8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Container dos produtos com overflow */}
          <div className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${(products.length / itemsToShow) * 100}%`,
                transform: `translateX(-${(currentIndex / products.length) * 100}%)`,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="shrink-0"
                  style={{ 
                    width: `${100 / products.length}%`,
                    paddingLeft: index === 0 ? '0' : '0.75rem',
                    paddingRight: index === products.length - 1 ? '0' : '0.75rem',
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Botão próximo */}
          {currentIndex < maxIndex && (
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
              aria-label="Próximos produtos"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#1FD9D8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
