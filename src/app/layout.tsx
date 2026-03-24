import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AddTripDialog } from "@/components/AddTripDialog";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weekender | Trip Planner",
  description: "Plan your perfect weekend getaways",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-slate-50 min-h-screen flex flex-col`}
      >
        <header className="border-b bg-white sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight">Weekender.</div>
            {session?.user && (
              <div className="flex items-center gap-4">
                <AddTripDialog />
                <form action={logoutUser}>
                  <Button variant="outline" type="submit">
                    Sign Out
                  </Button>
                </form>
              </div>
            )}
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
