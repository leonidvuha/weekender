# 🌍 Weekender

A modern, full-stack web application designed to help users seamlessly plan and manage their weekend getaways.

This project was built to demonstrate modern web development practices, including Server Side Rendering (SSR), secure authentication, database management, and responsive UI design using the Next.js App Router.

## ✨ Features

- **Secure Authentication:** Credential-based login and registration system using Auth.js with `bcrypt` password hashing.
- **Private Dashboards:** Protected routes ensuring users can only view, create, and manage their own trip data.
- **Full-Stack Server Actions:** Secure data mutation and retrieval without writing traditional API routes.
- **Database Integration:** Serverless PostgreSQL database management using Prisma ORM.
- **Modern UI/UX:** Clean, accessible, and highly responsive interface built with Tailwind CSS and `shadcn/ui`.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database:** PostgreSQL ([Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Auth.js](https://authjs.dev/) (NextAuth beta)
- **Deployment:** [Vercel](https://vercel.com)

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/YOUR_GITHUB_USERNAME/weekender.git
cd weekender
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following keys:
\`\`\`env

# Your PostgreSQL database connection string

DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Secret key for JWT encryption (generate any random string)

AUTH_SECRET="your-super-secret-key"
\`\`\`

### 4. Initialize the database

Push the Prisma schema to your database to create the required tables:
\`\`\`bash
npx prisma db push
\`\`\`

### 5. Run the development server

\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Author

- **Your Name** - [GitHub Profile](https://github.com/leonidvuha)
