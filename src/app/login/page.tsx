import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#2C2A4A] p-4"
    >
      <AuthForm />
    </div>
  );
}
