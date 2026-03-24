import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "../actions";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Enter your details to get started
          </p>
        </div>

        <form action={registerUser} className="space-y-4">
          <Input name="name" placeholder="Your Name (e.g. John Doe)" required />
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Create a password"
            required
            minLength={6}
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
