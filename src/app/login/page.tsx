import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
          Welcome to TaskZen
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
