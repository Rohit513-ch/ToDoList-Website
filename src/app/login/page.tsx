import { LoginForm } from "@/components/login-form";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/4061722/pexels-photo-4061722.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute top-4 left-4 z-10 md:top-8 md:left-8">
        <Link href="/" className="flex items-center gap-2 text-white">
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TaskZen</span>
        </Link>
      </div>
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
