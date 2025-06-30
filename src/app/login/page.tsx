import { LoginForm } from "@/components/login-form";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TaskZen</span>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}
