'use client'

import React, { useState, useEffect } from 'react'

/**
 * Interface para as categorias
 */
interface Category {
  id: string
  name: string
  imagePlaceholder: string
}

/**
 * Componente CategorySection
 * Seção de categorias com carrossel horizontal
 * Cards deslizam suavemente com navegação por setas
 */
export default function CategorySection() {
  // Lista de categorias
  const categories: Category[] = [
    {
      id: '1',
      name: 'Pelúcias',
      imagePlaceholder: 'Pelúcias',
    },
    {
      id: '2',
      name: 'Pantufas',
      imagePlaceholder: 'Pantufas',
    },
    {
      id: '3',
      name: 'Almofadas',
      imagePlaceholder: 'Almofadas',
    },
    {
      id: '4',
      name: 'Luminárias',
      imagePlaceholder: 'Luminárias',
    },
    {
      id: '5',
      name: 'Canecas/Copos/Garrafas',
      imagePlaceholder: 'Canecas',
    },
    {
      id: '6',
      name: 'Bolsas/Mochilas/Chaveiros',
      imagePlaceholder: 'Bolsas',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(3)

  /**
   * Atualiza quantos itens mostrar baseado no tamanho da tela
   */
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3) // Desktop: 3 cards
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2) // Tablet: 2 cards
      } else {
        setItemsToShow(1) // Mobile: 1 card
      }
    }

    updateItemsToShow()
    window.addEventListener('resize', updateItemsToShow)
    return () => window.removeEventListener('resize', updateItemsToShow)
  }, [])

  /**
   * Calcula o índice máximo possível
   */
  const maxIndex = Math.max(0, categories.length - itemsToShow)

  /**
   * Navega para o próximo conjunto de cards
   */
  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  /**
   * Navega para o conjunto anterior de cards
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  /**
   * Manipula o clique em uma categoria
   * Por enquanto apenas mostra um comentário indicando navegação futura
   */
  const handleCategoryClick = (categoryName: string) => {
    // Futuramente: navegar para página da categoria
    console.log(`Navegar para categoria: ${categoryName}`)
    alert(`Em breve você poderá navegar para a categoria: ${categoryName}`)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Título da seção com fonte infantil */}
        <h2 className="font-infantil text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 lg:mb-16 text-center px-4">
          Nossas Categorias
        </h2>

        {/* Container do carrossel */}
        <div className="relative px-8 md:px-12 lg:px-16">
          {/* Botão anterior */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
              aria-label="Categorias anteriores"
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

          {/* Container dos cards com overflow */}
          <div className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${(categories.length / itemsToShow) * 100}%`,
                transform: `translateX(-${(currentIndex / categories.length) * 100}%)`,
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: `${100 / categories.length}%`,
                    paddingLeft: index === 0 ? '0' : '0.75rem',
                    paddingRight: index === categories.length - 1 ? '0' : '0.75rem',
                  }}
                >
                  <div
                    onClick={() => handleCategoryClick(category.name)}
                    className="relative bg-gradient-to-br from-[#1FD9D8]/10 to-[#1FD9D8]/5 rounded-2xl overflow-hidden cursor-pointer group border border-gray-100 hover:border-[#1FD9D8]/30 transition-all duration-300 hover:shadow-xl h-full flex flex-col"
                  >
                    {/* Container da imagem placeholder */}
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 bg-gradient-to-br from-[#1FD9D8]/20 to-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                      {/* Placeholder visual */}
                      <div className="text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-[#1FD9D8]/20 rounded-full flex items-center justify-center group-hover:bg-[#1FD9D8]/30 transition-colors duration-300">
                          <svg
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#1FD9D8]"
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
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                          {category.imagePlaceholder}
                        </p>
                      </div>
                    </div>

                    {/* Nome da categoria */}
                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white flex-grow flex items-center">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-[#1FD9D8] transition-colors duration-200 text-center w-full">
                        {category.name}
                      </h3>
                    </div>

                    {/* Overlay sutil no hover */}
                    <div className="absolute inset-0 bg-[#1FD9D8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão próximo */}
          {currentIndex < maxIndex && (
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
              aria-label="Próximas categorias"
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
