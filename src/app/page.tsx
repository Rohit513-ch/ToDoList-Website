
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialCard } from "@/components/testimonial-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-card py-20 text-center md:py-32">
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
                  <Link href="/login">
                    <Zap className="mr-2 h-5 w-5" /> Start Managing Tasks
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-background py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Image
              src="https://storage.googleapis.com/aifirebase-1-1-prod.appspot.com/users%2Fclwkscw7v001s1r0158j61lmd%2Fprojects%2Fclz0x4pzn007n1r0155v71m6k%2Fdev%2Ffr-request-clz1f4q8h001r1q01375k7v9y-1719225792271.png"
              alt="ClockDiary banner with a quote from Lao Tzu: Time is a created thing. To say 'I don't have time' is to say 'I don't want to.'"
              width={828}
              height={315}
              className="mx-auto rounded-xl object-cover"
            />
          </div>
        </section>
        
        <section id="features" className="w-full bg-card py-16 text-center md:py-24">
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

        <section id="how-it-works" className="w-full bg-background py-16 md:py-24">
          <div className="container mx-auto grid items-center justify-center gap-6 px-4 text-center md:px-6">
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

        <section id="testimonials" className="w-full bg-card py-16 text-center md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">What Our Users Say</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Hear from the people who use TaskZen every day.
                 </p>
              </div>
            </div>
            <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-8 md:flex-row md:items-start">
              <TestimonialCard 
                name="Sarah Johnson"
                title="Freelance Writer"
              />
              <TestimonialCard 
                name="Mike Chen"
                title="Project Manager"
              />
              <TestimonialCard 
                name="Jessica Rodriguez"
                title="Student"
              />
            </div>
          </div>
        </section>

        <section id="about" className="w-full bg-background py-16 text-center md:py-24">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
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
