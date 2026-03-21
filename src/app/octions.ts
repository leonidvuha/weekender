'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTrip(formData: FormData) {
  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const startDate = new Date(formData.get("startDate") as string)
  const endDate = new Date(formData.get("endDate") as string)
  const imageUrl = formData.get("imageUrl") as string

  // Create a new record in PostgreSQL
  await prisma.trip.create({
    data: {
      title,
      location,
      startDate,
      endDate,
      imageUrl: imageUrl || null,
    },
  })

  // This tells Next.js to refresh the homepage and show the new trip
  revalidatePath("/")
}
export async function deleteTrip(id: string) {
  // Physical removal from the database
  await prisma.trip.delete({
    where: { id }
  })

  // Refresh the page to show the trip is gone
  revalidatePath("/")
}