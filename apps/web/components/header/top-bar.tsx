import { Truck, Phone, Mail } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-[#2A2D35] text-[#F0F0F0]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-[#40D9CD]" />
            <span>Frete gratis acima de R$199</span>
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Phone className="h-3.5 w-3.5 text-[#40D9CD]" />
            <span>(11) 99999-9999</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-[#40D9CD]" />
          <span>contato@uppelucias.com.br</span>
        </div>
      </div>
    </div>
  )
}
