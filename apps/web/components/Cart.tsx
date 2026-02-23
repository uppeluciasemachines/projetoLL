'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'

/**
 * Componente Cart
 * Painel lateral do carrinho de compras que desliza da direita
 * com transições suaves e design moderno
 */
export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  /**
   * Controla a montagem do componente para animação suave
   */
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      // Pequeno delay para garantir que o elemento está renderizado antes da animação
      const timer = setTimeout(() => {
        setShouldAnimate(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setShouldAnimate(false)
      // Aguarda a animação de saída terminar antes de remover do DOM
      const timer = setTimeout(() => setIsMounted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

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
   * Manipula o clique no botão de checkout
   */
  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!')
      return
    }
    // Futuramente: navegar para página de checkout/pagamento
    alert('Em breve você será redirecionado para a página de pagamento!')
    console.log('Itens do carrinho:', items)
    console.log('Total:', getTotalPrice())
  }

  /**
   * Fecha o carrinho
   */
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Botão para abrir o carrinho */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:text-[#FE6603] transition-colors duration-200"
        aria-label="Abrir carrinho"
      >
        <svg
          className="w-6 h-6"
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
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FE6603] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {items.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Overlay e painel lateral */}
      {isMounted && (
        <div className="fixed inset-0 z-100 overflow-hidden">
          {/* Overlay com fade */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              isOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={handleClose}
          />

          {/* Painel lateral que desliza da direita */}
          <div
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
              shouldAnimate && isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header do carrinho */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-white">
              <button
                onClick={handleClose}
                className="text-[#FFB6C1] hover:text-[#FE6603] transition-colors duration-200 p-1"
                aria-label="Fechar carrinho"
              >
                <svg
                  className="w-6 h-6"
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
              <h2 className="text-xl font-bold text-gray-800 flex-1">
                MEU CARRINHO DE COMPRAS
              </h2>
            </div>

            {/* Lista de itens - scrollável */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-300 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Imagem do produto */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-10 h-10 text-gray-400"
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

                      {/* Informações do produto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm text-gray-600">
                            Quantidade: {item.quantity}
                          </span>
                          {/* Controles de quantidade */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center bg-red-600 hover:bg-gray-300 rounded transition-colors text-xs"
                              aria-label="Diminuir quantidade"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center bg-green-600 hover:bg-gray-300 rounded transition-colors text-xs"
                              aria-label="Aumentar quantidade"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-[#FE6603]">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Botão remover */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-700 hover:text-red-500 transition-colors p-2 flex-shrink-0"
                        aria-label="Remover produto"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer com subtotal e botões */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-white space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">SUBTOTAL:</span>
                  <span className="text-2xl font-bold text-[#FE6603]">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                {/* Botão Finalizar Compra */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  FINALIZAR COMPRA
                </button>

                {/* Link Continuar Comprando */}
                <button
                  onClick={handleClose}
                  className="w-full text-[#1FD9D8] hover:text-[#1ac5c4] font-medium py-2 transition-colors duration-200"
                >
                  CONTINUAR COMPRANDO
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
