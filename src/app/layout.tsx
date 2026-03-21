import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AddTripDialog } from "@/components/AddTripDialog";

// Подключаем современный шрифт Inter (золотой стандарт веба)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weekender | Trip Planner",
  description: "Plan your perfect weekend getaways",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Применяем шрифт ко всему сайту (antialiased делает текст более сглаженным) */}
      <body className={`${inter.className} antialiased bg-slate-50 min-h-screen flex flex-col`}>
        
        {/* Это наша новая навигационная панель (Navbar) */}
        <header className="border-b bg-white sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight">Weekender.</div>
            {/* Сюда мы позже добавим кнопку "Add Trip" */}
            <AddTripDialog />
          </div>
        </header>

        {/* Здесь будут рендериться наши страницы (например, page.tsx) */}
        <div className="flex-1">
          {children}
        </div>

      </body>
    </html>
  );
}