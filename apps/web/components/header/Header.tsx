import { User } from "lucide-react"
import { SearchBar } from "./search-bar"
import { CategoryNav } from "./category-nav"
import { MobileMenu } from "./mobile-menu"
import Cart from "../Cart"

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Main header */}
      <div className="bg-[#2BBCB3]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:gap-8">
          {/* Mobile menu */}
          <MobileMenu />

          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2" aria-label="UP! Universo das Pelucias - Pagina Inicial">
            <div className="flex h-11 w-20 items-center justify-center ">
              <img src="/imagens/logo.png" alt="Logo Up" />
            </div>
          </a>

          {/* Search bar - desktop */}
          <div className="hidden flex-1 lg:flex lg:justify-center">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 lg:gap-2">
            {/* Cart */}
            <Cart />

            {/* Login button */}
            <a
              href="#"
              className="ml-1 hidden items-center gap-2 rounded-lg border-2 border-[#FFF]/30 bg-[#FFF]/10 px-4 py-2 text-sm font-bold text-[#FFF] backdrop-blur-sm transition-all hover:border-[#FFF]/60 hover:bg-[#FFF]/20 sm:flex"
            >
              <User className="h-4 w-4" />
              Entrar
            </a>
          </div>
        </div>

        {/* Search bar - mobile */}
        <div className="px-4 pb-3 lg:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Category navigation - visível apenas em telas médias para cima */}
      <div className="hidden md:block">
        <CategoryNav />
      </div>
    </header>
  )
}
