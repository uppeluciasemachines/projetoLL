import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../contexts/CartContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UP Universo das pelúcias",
  description: "Site da UP pelúcias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={nunito.variable}>
      <body className="antialiased">
        {/* Provider do contexto do carrinho para toda a aplicação */}
        <CartProvider>
          <Header />
          <div className="pt-0">
        {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
