const categories = [
  { name: "Pelucias", href: "#" },
  { name: "Pantufas", href: "#" },
  { name: "Almofadas", href: "#" },
  { name: "Luminarias", href: "#" },
  { name: "Canecas e Copos", href: "#" },
  { name: "Bolsas e Mochilas", href: "#" },
  { name: "Chaveiros", href: "#" },
]

export function CategoryNav() {
  return (
    <nav className="border-t border-[#35B8AF]/20 bg-[#FFF]" aria-label="Categorias">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex items-center justify-center gap-0 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href={category.href}
                className="relative whitespace-nowrap px-3.5 py-3 text-sm font-semibold text-[#444] transition-colors hover:text-[#F47B20] inline-flex items-center after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-[#F47B20] after:transition-all hover:after:w-4/5"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
