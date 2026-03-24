import { loginUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-2">
            Enter your credentials to access your trips
          </p>
        </div>

        <form action={loginUser} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
