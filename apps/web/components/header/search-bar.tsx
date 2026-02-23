"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <div className="relative flex w-full max-w-xl items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="O que voce esta procurando?"
        className="h-10 w-full rounded-l-lg border-0 bg-[#F5F7F8] px-4 text-sm text-[#2A2D35] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#40D9CD]/50"
      />
      <button
        type="button"
        className="flex h-10 items-center justify-center rounded-r-lg bg-[#F47B20] px-4 text-[#fff] transition-colors hover:bg-[#E06A10]"
        aria-label="Buscar"
      >
        <Search className="h-4.5 w-4.5" />
      </button>
    </div>
  )
}
