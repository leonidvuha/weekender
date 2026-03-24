'use server'

import { auth, signIn } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createTrip(formData: FormData) {
  // 1. Проверяем, кто сейчас вошел на сайт
  const session = await auth()
  
  // Если пропуска нет — выдаем ошибку (защита от незваных гостей)
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a trip")
  }

  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const startDate = new Date(formData.get("startDate") as string)
  const endDate = new Date(formData.get("endDate") as string)
  const imageUrl = formData.get("imageUrl") as string

  // 2. Создаем карточку в базе и привязываем её к текущему пользователю
  await prisma.trip.create({
    data: {
      title,
      location,
      startDate,
      endDate,
      imageUrl: imageUrl || null,
      userId: session.user.id, // <-- ВОТ ОНО! То, что требовал TypeScript
    },
  })

  // 3. Обновляем страницу
  revalidatePath("/")
}
export async function deleteTrip(id: string) {
  // 1. Проверяем, вошел ли человек
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete a trip")
  }

  // 2. Удаляем карточку, НО только если она принадлежит этому пользователю
  // deleteMany безопасно удалит 1 карточку, если совпадет и ID карточки, и ID владельца
  await prisma.trip.deleteMany({
    where: { 
      id: id,
      userId: session.user.id // <-- Та самая защита от "хакеров"
    }
  })

  // 3. Обновляем страницу
  revalidatePath("/")
}
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // 1. Проверяем, не занят ли уже этот email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  
  if (existingUser) {
    throw new Error("User already exists")
  }

  // 2. Шифруем пароль (10 - это уровень сложности шифрования)
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Создаем пользователя в базе данных
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  // 4. После успешной регистрации перенаправляем на стандартную страницу входа
  redirect("/login")
}
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Передаем данные в наш мозг авторизации и просим пустить на главную страницу ("/")
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  })
}