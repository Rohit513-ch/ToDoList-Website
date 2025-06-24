import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row gap-4 py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} TaskZen. All rights reserved.</p>
      <nav className="flex gap-4 sm:gap-6">
        <Link href="https://github.com/firebase/firebase-genkit-samples/tree/main/nextjs-pro" className="text-xs hover:underline underline-offset-4" prefetch={false} target="_blank">
          Source Code
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
    </footer>
  )
}
