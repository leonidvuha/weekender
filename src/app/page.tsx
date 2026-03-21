import Image from "next/image"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const trips = await prisma.trip.findMany({
    orderBy: { startDate: 'asc' } // Сортируем поездки по дате
  })

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 tracking-tight font-sans">
        My Weekend Trips
      </h1>
      
      {/* Сетка: 1 колонка на мобилках, 2 на планшетах, 3 на десктопах */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden flex flex-col">
            {/* Блок с картинкой */}
            <div className="relative h-48 w-full bg-muted">
              {trip.imageUrl ? (
                <Image
                  src={trip.imageUrl}
                  alt={trip.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            
            {/* Текстовая часть карточки */}
            <CardHeader>
              <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
              <CardDescription>{trip.location}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pb-6 text-sm text-muted-foreground">
               {/* Форматируем даты, чтобы они выглядели красиво */}
               {new Intl.DateTimeFormat('en-US', {
                 month: 'short',
                 day: 'numeric',
                 year: 'numeric'
               }).format(trip.startDate)} 
               {" - "} 
               {new Intl.DateTimeFormat('en-US', {
                 month: 'short',
                 day: 'numeric'
               }).format(trip.endDate)}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}