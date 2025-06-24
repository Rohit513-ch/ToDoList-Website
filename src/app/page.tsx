
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
              <div className="relative mt-4 inline-flex items-center justify-center gap-4 group">
                <div
                  className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
                ></div>
                <Link
                  href="/login"
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                  title="Get Started"
                  >
                  Get Started For Free
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="10"
                    width="10"
                    fill="none"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-20 md:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Image
                alt="Task Management App Screenshot 1"
                className="w-full h-auto rounded-xl shadow-lg"
                src="https://clockdiary.com/wp-content/uploads/2024/08/MicrosoftTeams-image-2048x853.webp"
                data-ai-hint="task management"
                width={1200}
                height={500}
              />
              <Image
                alt="Task Management App Screenshot 2"
                className="w-full h-auto rounded-xl shadow-lg"
                src="https://clockdiary.com/wp-content/uploads/2024/09/image-2-1536x639-7.webp"
                data-ai-hint="app interface"
                width={1200}
                height={500}
              />
              <Image
                alt="Task Management App Screenshot 3"
                className="w-full h-auto rounded-xl shadow-lg"
                src="https://clockdiary.com/wp-content/uploads/2024/09/image-1-1536x639-1.webp"
                data-ai-hint="task list"
                width={1200}
                height={500}
              />
              <Image
                alt="Task Management App Screenshot 4"
                className="w-full h-auto rounded-xl shadow-lg"
                src="https://clockdiary.com/wp-content/uploads/2024/09/MicrosoftTeams-image-1-1024x427-1.webp"
                data-ai-hint="feature showcase"
                width={1200}
                height={500}
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-background py-16 text-center md:py-24">
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

        <section id="how-it-works" className="w-full bg-card py-16 md:py-24">
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
        
        <section id="testimonials" className="w-full bg-background py-16 text-center md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">What Our Users Say</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Hear from the people who use TaskZen every day.
                 </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-full grid-cols-1 gap-8 md:grid-cols-3">
              <TestimonialCard 
                name="Sarah Johnson"
                title="Freelance Writer"
                quote="TaskZen has completely transformed how I manage my deadlines. It's simple, intuitive, and beautiful."
              />
              <TestimonialCard 
                name="Mike Chen"
                title="Project Manager"
                quote="The best to-do app I've ever used. It helps my team stay on track and keeps our projects moving forward."
              />
              <TestimonialCard 
                name="Jessica Rodriguez"
                title="Student"
                quote="As a student, keeping track of assignments is a nightmare. TaskZen makes it easy and even a little fun!"
              />
            </div>
          </div>
        </section>

        <section id="about" className="w-full bg-card py-16 text-center md:py-24">
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
