'use client'

import React from 'react'
import HeroCarousel from '../components/HeroCarousel'
import ProductGrid from '../components/ProductGrid'
import CategorySection from '../components/CategorySection'

/**
 * Página inicial (Home) do e-commerce
 * Contém todas as seções principais: banner, lançamentos, mais vendidos e categorias
 */

// Dados mockados de produtos para Lançamentos
const lancamentos = [
  {
    id: '1',
    name: 'Pelúcia Urso Fofinho Grande',
    price: 89.90,
    image: 'placeholder-1',
  },
  {
    id: '2',
    name: 'Pelúcia Coelho Macio',
    price: 69.90,
    image: 'placeholder-2',
  },
  {
    id: '3',
    name: 'Pelúcia Gato Fofinho',
    price: 79.90,
    image: 'placeholder-3',
  },
  {
    id: '4',
    name: 'Pelúcia Cachorro Carinhoso',
    price: 85.90,
    image: 'placeholder-4',
  },
  {
    id: '5',
    name: 'Pelúcia Panda Gigante',
    price: 99.90,
    image: 'placeholder-5',
  },
  {
    id: '6',
    name: 'Pelúcia Elefante Azul',
    price: 75.90,
    image: 'placeholder-6',
  },
  {
    id: '7',
    name: 'Pelúcia Unicórnio Mágico',
    price: 95.90,
    image: 'placeholder-7',
  },
  {
    id: '8',
    name: 'Pelúcia Leão Corajoso',
    price: 88.90,
    image: 'placeholder-8',
  },
]

// Dados mockados de produtos para Mais Vendidos
const maisVendidos = [
  {
    id: '9',
    name: 'Pantufa Urso Confortável',
    price: 59.90,
    image: 'placeholder-9',
  },
  {
    id: '10',
    name: 'Almofada Pelúcia Coração',
    price: 45.90,
    image: 'placeholder-10',
  },
  {
    id: '11',
    name: 'Luminária Pelúcia Estrela',
    price: 129.90,
    image: 'placeholder-11',
  },
  {
    id: '12',
    name: 'Caneca Pelúcia Personalizada',
    price: 39.90,
    image: 'placeholder-12',
  },
  {
    id: '13',
    name: 'Mochila Pelúcia Urso',
    price: 149.90,
    image: 'placeholder-13',
  },
  {
    id: '14',
    name: 'Chaveiro Pelúcia Mini',
    price: 19.90,
    image: 'placeholder-14',
  },
  {
    id: '15',
    name: 'Pelúcia Urso Pequeno',
    price: 49.90,
    image: 'placeholder-15',
  },
  {
    id: '16',
    name: 'Garrafa Pelúcia Térmica',
    price: 79.90,
    image: 'placeholder-16',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Banner principal com carrossel */}
      <section id="home" className="mb-0">
        <HeroCarousel />
      </section>

      {/* Seção de Lançamentos */}
      <section id="produtos" className="mb-0">
        <ProductGrid title="Lançamentos" products={lancamentos} />
      </section>

      {/* Seção de Mais Vendidos */}
      <section className="mb-0">
        <ProductGrid title="Mais Vendidos" products={maisVendidos} />
      </section>

      {/* Seção de Categorias */}
      <section id="categorias" className="mb-0">
        <CategorySection />
      </section>
    </main>
  )
}
