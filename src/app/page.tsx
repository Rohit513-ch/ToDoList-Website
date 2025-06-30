"use client";

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { CheckCircle, ChevronLeft, ChevronRight, FilePlus2, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialCard } from "@/components/testimonial-card"

export default function Home() {
  const galleryImages = [
    {
      src: "https://clockdiary.com/wp-content/uploads/2024/08/MicrosoftTeams-image-2048x853.webp",
      alt: "Task Management App Screenshot 1",
      "data-ai-hint": "task management"
    },
    {
      src: "https://clockdiary.com/wp-content/uploads/2024/09/image-2-1536x639-7.webp",
      alt: "Task Management App Screenshot 2",
      "data-ai-hint": "app interface"
    },
    {
      src: "https://clockdiary.com/wp-content/uploads/2024/09/image-1-1536x639-1.webp",
      alt: "Task Management App Screenshot 3",
      "data-ai-hint": "task list"
    },
    {
      src: "https://clockdiary.com/wp-content/uploads/2024/09/MicrosoftTeams-image-1-1024x427-1.webp",
      alt: "Task Management App Screenshot 4",
      "data-ai-hint": "feature showcase"
    },
    {
      src: "https://clockdiary.com/wp-content/uploads/2024/08/MicrosoftTeams-image-7-2048x853.webp",
      alt: "Task Management App Screenshot 5",
      "data-ai-hint": "app dashboard"
    },
    {
      src: "https://clockdiary.com/wp-content/uploads/2024/08/MicrosoftTeams-image-10-2048x853.webp",
      alt: "Task Management App Screenshot 6",
      "data-ai-hint": "task details"
    }
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % galleryImages.length
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section
          className="relative w-full py-20 text-center md:py-32 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/30480339/pexels-photo-30480339.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl/tight font-headline">
                  Stay Organized. Get Things Done.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed">
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
        
        <section className="w-full py-24 md:py-40 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">App Showcase</h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Take a closer look at TaskZen&apos;s interface and features. Click the arrows to navigate.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-6xl relative group">
                <Image
                  key={currentImageIndex}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full h-auto rounded-xl shadow-lg object-contain"
                  src={galleryImages[currentImageIndex].src}
                  data-ai-hint={galleryImages[currentImageIndex]['data-ai-hint']}
                  width={1200}
                  height={675}
                />
                <Button
                  onClick={handlePrev}
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 hover:text-white">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={handleNext}
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 hover:text-white">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative w-full py-16 text-center md:py-24 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/18541768/pexels-photo-18541768.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm text-white">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-white">Everything You Need to Be Productive</h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed">
                  TaskZen is designed to be powerful yet simple. No sign-up required — just start!
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">Add, edit, and delete tasks</h3>
                <p className="text-sm text-gray-200">Easily manage your tasks with intuitive controls.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">Mark tasks complete</h3>
                <p className="text-sm text-gray-200">Keep track of your progress with a simple click.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">Local Storage Persistence</h3>
                <p className="text-sm text-gray-200">Your tasks are saved in your browser, so you never lose them.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center lg:col-start-2">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">Mobile-Friendly</h3>
                <p className="text-sm text-gray-200">Manage your tasks on the go with a fully responsive design.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Getting started with TaskZen is as easy as 1-2-3.
              </p>
            </div>
            <div className="relative mt-20">
              <div
                aria-hidden="true"
                className="absolute inset-0 top-9 mx-auto hidden h-px w-2/3 border-t-2 border-dashed border-border md:block"
              />
              <div className="grid gap-y-12 md:grid-cols-3 md:gap-x-8">
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-secondary p-4 shadow-lg ring-1 ring-border">
                    <FilePlus2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1. Add Your Tasks</h3>
                  <p className="text-muted-foreground text-sm">
                    Type your task into the input field and click &apos;Add&apos; to instantly create a new to-do item.
                  </p>
                </div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-secondary p-4 shadow-lg ring-1 ring-border">
                    <Pencil className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2. Manage Your List</h3>
                  <p className="text-muted-foreground text-sm">
                    Need to make a change? Click the pencil to edit, or the trash can to delete a task.
                  </p>
                </div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-secondary p-4 shadow-lg ring-1 ring-border">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">3. Track Your Progress</h3>
                  <p className="text-muted-foreground text-sm">
                    Click the checkbox to mark tasks as complete and watch your to-do list shrink.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section
          id="testimonials"
          className="relative w-full py-16 text-center md:py-24 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/18541767/pexels-photo-18541767.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl font-headline">What Our Users Say</h2>
                 <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed">
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

        <section id="about" className="w-full bg-background py-16 text-center md:py-24">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">About This Project</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                The To-Do List App is a simple yet powerful productivity tool designed to help users stay organized and focused. It allows you to jot down daily tasks, prioritize important activities, and keep track of what’s done and what’s pending — all in one place. Whether you're managing homework, personal goals, or work projects, this app ensures you don’t miss a thing. With features like task editing, deletion, completion tracking, and automatic saving through local storage, it's perfect for improving time management and reducing mental clutter.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
