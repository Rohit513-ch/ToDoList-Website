import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main
        className="relative flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
