import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Проверяем, ввел ли пользователь вообще email и пароль
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Ищем пользователя в нашей базе данных Neon
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Если такого email нет — отказываем во входе
        if (!user) {
          return null;
        }

        // 3. Сверяем пароли с помощью криптографии (bcrypt)
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        // Если пароль не совпал — отказываем
        if (!isPasswordValid) {
          return null;
        }

        // 4. Если всё отлично, пускаем и выдаем "электронный пропуск" (токен)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Используем токены (JSON Web Tokens)
  },
  callbacks: {
    // Вшиваем ID пользователя в токен, чтобы знать, чьи карточки показывать
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
