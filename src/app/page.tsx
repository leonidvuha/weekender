import { prisma } from "@/lib/prisma"

// In Next.js App Router, components can be 'async' and fetch data directly!
export default async function Home() {
  // Fetching all trips from the database
  const trips = await prisma.trip.findMany()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 tracking-tight">
        My Weekend Trips
      </h1>
      
      <div className="grid gap-4">
        {trips.map((trip) => (
          <div 
            key={trip.id} 
            className="p-6 border rounded-xl shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold">{trip.title}</h2>
            <p className="text-gray-500 mt-1">{trip.location}</p>
          </div>
        ))}
      </div>
    </main>
  )
}