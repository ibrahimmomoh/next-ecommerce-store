import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Big Techs | Premium Gadgets & Gear",
  description: "Your destination for the latest technology and premium essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer style={{
            backgroundColor: '#fff',
            padding: '40px 0',
            marginTop: '60px',
            borderTop: '1px solid #eee',
            textAlign: 'center'
          }}>
            <div className="container">
              <p>&copy; 2026 Big Techs. All rights reserved.</p>
              <p style={{ color: '#777', fontSize: '0.9rem', marginTop: '10px' }}>
                Built with Next.js & Vanilla CSS
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

