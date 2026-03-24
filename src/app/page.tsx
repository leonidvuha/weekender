import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTrip } from "./actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // 1. Фейсконтроль: проверяем электронный пропуск
  const session = await auth()

  // 2. Если пропуска нет — выгоняем на страницу входа
  if (!session?.user?.id) {
    redirect("/login")
  }

  // 3. Достаем поездки ТОЛЬКО для этого пользователя, чтобы никто чужой случайно не удалил ваши планы на выходные!
  const trips = await prisma.trip.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      startDate: "asc", 
    },
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

            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                <CardDescription>{trip.location}</CardDescription>
              </div>

              {/* Форма для удаления поездки */}
              <form
                action={async () => {
                  "use server";
                  await deleteTrip(trip.id);
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </CardHeader>
            <CardContent className="mt-auto pb-6 text-sm text-muted-foreground">
              {/* Форматируем даты, чтобы они выглядели красиво */}
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(trip.startDate)}
              {" - "}
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
              }).format(trip.endDate)}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
