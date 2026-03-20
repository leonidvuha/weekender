import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data to avoid duplicates upon restart
  await prisma.trip.deleteMany()

  // Seed the database with initial trips
  await prisma.trip.createMany({
    data: [
      {
        title: "Weekend in Europa-Park",
        location: "Rust, Germany",
        startDate: new Date("2026-05-15T10:00:00Z"),
        endDate: new Date("2026-05-17T18:00:00Z"),
        imageUrl: "https://images.unsplash.com/photo-1662998337774-60c704175de8?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "City trip to Strasbourg",
        location: "Strasbourg, France",
        startDate: new Date("2026-06-12T09:00:00Z"),
        endDate: new Date("2026-06-14T20:00:00Z"),
        imageUrl: "https://images.unsplash.com/photo-1549480119-093bd3e00b52?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Relaxing at Lake Constance",
        location: "Meersburg, Germany",
        startDate: new Date("2026-07-20T10:00:00Z"),
        endDate: new Date("2026-07-22T16:00:00Z"),
        imageUrl: "https://images.unsplash.com/photo-1627221437145-c49c30bd87a0?q=80&w=800&auto=format&fit=crop"
      }
    ]
  })
  
  console.log("✅ Database successfully seeded with test trips!")
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })