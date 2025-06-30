import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/4061722/pexels-photo-4061722.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
          Welcome to TaskZen
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
