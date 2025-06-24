import Link from "next/link"
import Image from "next/image"
import { ListTodo, CheckCircle, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/tight font-headline">
                  Stay Organized. Get Things Done.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  A simple and smart to-do list app to boost your productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/todo">
                    <Zap className="mr-2 h-5 w-5" /> Start Managing Tasks
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Everything You Need to Be Productive</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  TaskZen is designed to be powerful yet simple. No sign-up required — just start!
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Add, edit, and delete tasks</h3>
                <p className="text-sm text-muted-foreground">Easily manage your tasks with intuitive controls.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Mark tasks complete</h3>
                <p className="text-sm text-muted-foreground">Keep track of your progress with a simple click.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Local Storage Persistence</h3>
                <p className="text-sm text-muted-foreground">Your tasks are saved in your browser, so you never lose them.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center lg:col-start-2">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Mobile-Friendly</h3>
                <p className="text-sm text-muted-foreground">Manage your tasks on the go with a fully responsive design.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-16 md:py-24 bg-background text-center">
          <div className="container mx-auto grid items-center justify-center gap-6 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                A simple guide to get you started in seconds.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4">
              <ol className="list-inside list-decimal space-y-2 text-left text-muted-foreground">
                <li>Type your task into the input box.</li>
                <li>Click "Add" to save it to your list.</li>
                <li>Click the checkbox to mark it complete.</li>
                <li>Use the edit icon to change a task.</li>
                <li>Click the delete icon to remove a task.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-secondary shadow-xl">
              <div className="grid md:grid-cols-3">
                <div className="space-y-8 p-8 md:col-span-2 md:p-12">
                  <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                    <ListTodo className="h-8 w-8 text-primary" />
                    <span>TaskZen</span>
                  </div>
                  <blockquote className="text-2xl font-medium text-foreground/90 md:text-3xl">
                    "Time is the scarcest resource, and unless it is managed, nothing else can be managed."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-auto text-primary/20"
                      aria-hidden="true"
                    >
                      <rect width="24" height="18" fill="currentColor" />
                    </svg>
                    <p className="text-lg font-semibold text-foreground">Peter Drucker</p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center rounded-l-[5rem] bg-card p-8 md:col-span-1 md:rounded-l-full">
                  <Image
                    src="https://placehold.co/300x300.png"
                    alt="Peter Drucker"
                    width={200}
                    height={200}
                    className="h-40 w-40 rounded-full border-4 border-background object-cover md:h-48 md:w-48 lg:h-56 lg:w-56"
                    data-ai-hint="man portrait"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-16 md:py-24 bg-background text-center">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">About This Project</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                This app was built using Next.js, TypeScript, and Tailwind CSS. It aims to improve productivity while helping learners understand core front-end concepts.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
