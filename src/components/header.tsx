"use client";

import Link from "next/link"
import { ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <ListTodo className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold font-headline">TaskZen</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Home
        </Link>
        <Button asChild variant="secondary" size="sm">
          <Link href="/todo" prefetch={false}>
            To-Do App
          </Link>
        </Button>
      </nav>
    </header>
  )
}
