import { AuthForm } from "@/components/auth-form";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Link href="/" className="absolute top-6 right-6 flex items-center gap-2" prefetch={false}>
        <ListTodo className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">TaskZen</span>
      </Link>
      <div className="w-full max-w-md">
        <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
          Welcome to TaskZen
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
