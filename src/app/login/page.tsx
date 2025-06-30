import { AuthForm } from "@/components/auth-form";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/4061722/pexels-photo-4061722.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <Link href="/" className="absolute top-6 left-6 z-10 flex items-center gap-2" prefetch={false}>
        <ListTodo className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-white">TaskZen</span>
      </Link>
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
          Welcome to TaskZen
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}