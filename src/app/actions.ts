'use server'

import { auth, signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createTrip(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a trip")
  }

  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const startDate = new Date(formData.get("startDate") as string)
  const endDate = new Date(formData.get("endDate") as string)
  const imageUrl = formData.get("imageUrl") as string

  await prisma.trip.create({
    data: {
      title,
      location,
      startDate,
      endDate,
      imageUrl: imageUrl || null,
      userId: session.user.id, 
    },
  })
  revalidatePath("/")
}
export async function deleteTrip(id: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete a trip")
  }
  await prisma.trip.deleteMany({
    where: { 
      id: id,
      userId: session.user.id
    }
  })
  revalidatePath("/")
}
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  redirect("/login")
}
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string


  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  })
}
export async function logoutUser() {
  await signOut({ redirectTo: "/login" })
}