import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TodoApp } from "@/components/todo-app"

export default function TodoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <TodoApp />
        </div>
      </main>
      <Footer />
    </div>
  )
}
