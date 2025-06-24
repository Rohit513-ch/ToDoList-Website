"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TodoApp } from "@/components/todo-app"
import { Skeleton } from '@/components/ui/skeleton';

export default function TodoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 w-full bg-background py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Skeleton className="h-10 w-1/2 mx-auto mb-6 bg-muted" />
              <Skeleton className="h-12 w-full mb-6 bg-muted" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full bg-muted" />
                <Skeleton className="h-16 w-full bg-muted" />
                <Skeleton className="h-16 w-full bg-muted" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
