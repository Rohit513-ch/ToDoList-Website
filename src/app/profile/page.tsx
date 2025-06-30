"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, ListTodo } from 'lucide-react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return null or a loading skeleton on the server and initial client render
    return null;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-border/10">
        <Link href="/todo" className="flex items-center gap-2" prefetch={false}>
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TaskZen</span>
        </Link>
        <Button asChild variant="outline">
          <Link href="/login">Logout</Link>
        </Button>
      </header>

      <main className="p-8 md:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <Avatar className="h-32 w-32 ring-4 ring-primary">
                <AvatarImage src={user?.avatar || "https://i.ibb.co/NbzvwCN/profile-pic.jpg"} alt="User Avatar" data-ai-hint="profile picture" />
                <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Label className="text-sm text-muted-foreground">Job Title</Label>
                <p className="text-lg font-medium">Head of Marketing</p>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-12">
            
          </div>
        </div>
      </main>
    </div>
  );
}
