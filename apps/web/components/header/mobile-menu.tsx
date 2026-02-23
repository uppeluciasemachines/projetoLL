"use client"

import { Menu, X, ChevronRight } from "lucide-react"
import { useState } from "react"

const categories = [
  { name: "Pelucias", href: "#" },
  { name: "Pantufas", href: "#" },
  { name: "Almofadas", href: "#" },
  { name: "Luminarias", href: "#" },
  { name: "Canecas e Copos", href: "#" },
  { name: "Bolsas e Mochilas", href: "#" },
  { name: "Chaveiros", href: "#" },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-lg p-2 text-[#FFF] transition-colors hover:bg-[#35B8AF]/30 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#000]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-[#FFF] shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E0E0E0] px-4 py-4">
          <span className="text-lg font-bold text-[#2A2D35]">Menu</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-[#666] hover:bg-[#F5F5F5]"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-[#999]">
            Categorias
          </p>
          <ul className="flex flex-col gap-0.5">
            {categories.map((category) => (
              <li key={category.name}>
                <a
                  href={category.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[#333] transition-colors hover:bg-[#E8FAF8] hover:text-[#2BBCB3]"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                  <ChevronRight className="h-4 w-4 text-[#CCC]" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-[#E0E0E0] p-4">
          <a
            href="#"
            className="flex w-full items-center justify-center rounded-lg bg-[#2BBCB3] py-2.5 text-sm font-bold text-[#FFF] transition-colors hover:bg-[#259E97]"
          >
            Entrar na minha conta
          </a>
          <a
            href="#"
            className="mt-2 flex w-full items-center justify-center rounded-lg border border-[#E0E0E0] py-2.5 text-sm font-medium text-[#555] transition-colors hover:bg-[#F5F5F5]"
          >
            Criar conta
          </a>
        </div>
      </div>
    </>
  )
}
