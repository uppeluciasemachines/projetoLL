'use client'

import React, { useState, useEffect } from 'react'

/**
 * Interface para os slides do carrossel
 */
interface Slide {
  id: number
  title: string
  subtitle: string
  imagePlaceholder: string
}

/**
 * Componente HeroCarousel
 * Banner principal com carrossel automático que troca a cada 6 segundos
 * Utiliza animação fade suave entre os slides
 */
export default function HeroCarousel() {
  // Slides do carrossel (usando placeholders)
  const slides: Slide[] = [
    {
      id: 1,
      title: 'Bem-vindo ao Universo das Pelúcias',
      subtitle: 'Encontre o companheiro perfeito para cada momento',
      imagePlaceholder: 'Slide 1',
    },
    {
      id: 2,
      title: 'Novos Lançamentos',
      subtitle: 'Descubra nossa coleção exclusiva de pelúcias',
      imagePlaceholder: 'Slide 2',
    },
    {
      id: 3,
      title: 'Presenteie com Carinho',
      subtitle: 'Pelúcias que transmitem amor e afeto',
      imagePlaceholder: 'Slide 3',
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  /**
   * Efeito para trocar automaticamente os slides a cada 6 segundos
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // 6 segundos

    return () => clearInterval(interval)
  }, [slides.length])

  /**
   * Função para navegar para um slide específico
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  /**
   * Navega para o slide anterior
   */
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  /**
   * Navega para o próximo slide
   */
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative w-full h-100 sm:h-125 md:h-150 lg:h-115 overflow-hidden mb-0">
      {/* Container dos slides com animação de slide */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(currentSlide / slides.length) * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="shrink-0 w-full h-full"
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* Placeholder da imagem sem cores */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center px-4">
                  {/* Placeholder visual simples */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl">
                      {slide.imagePlaceholder}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-header p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10 border border-gray-200"
        aria-label="Slide anterior"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#1FD9D8] p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10 border border-gray-200"
        aria-label="Próximo slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
    </section>
  )
}
