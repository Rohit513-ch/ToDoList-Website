import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  )
}
