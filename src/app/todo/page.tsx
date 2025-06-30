"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TodoApp } from '@/components/todo-app';
import { LayoutGrid, ListTodo, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/lib/types';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export default function TodoPage() {
  const [todoListOpen, setTodoListOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const [activeSidebarTasks, setActiveSidebarTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleTasksChange = useCallback((tasks: Task[]) => {
    setActiveSidebarTasks(tasks.filter(task => !task.completed));
  }, []);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-gradient-to-b from-gray-900 to-gray-700 text-gray-300 border-r border-gray-700">
        <div className="flex h-full flex-col">
          <div className="flex items-center h-20 px-6 border-b border-gray-700">
            <Link href="/" className="flex items-center gap-2">
              <ListTodo className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">TaskZen</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            
            <Button suppressHydrationWarning variant="ghost" className="w-full justify-start h-12 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
              <LayoutGrid className="w-5 h-5 mr-3" /> Overview
            </Button>
            
            <div>
              <Button suppressHydrationWarning variant="ghost" onClick={() => setTodoListOpen(!todoListOpen)} className="w-full justify-start h-12 text-base font-medium text-white bg-gray-700 hover:bg-gray-600">
                <ListTodo className="w-5 h-5 mr-3" /> Todo List
                <div className="ml-auto">
                  {todoListOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
              {todoListOpen && (
                <div className="pl-12 pt-2 space-y-3 text-sm text-gray-400">
                  {activeSidebarTasks.length > 0 ? (
                    activeSidebarTasks.map(task => (
                      <p key={task.id} className="cursor-pointer hover:text-white truncate" title={task.title}>
                        {task.title}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No active tasks</p>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <div className="flex items-center gap-6">
            <Button suppressHydrationWarning variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button suppressHydrationWarning variant="ghost" className="relative h-12 w-12 rounded-full p-0">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatar || "https://i.ibb.co/NbzvwCN/profile-pic.jpg"} alt="User Avatar" data-ai-hint="profile picture" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user ? `${user.firstName} ${user.lastName}` : 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user ? user.email : 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "This is just a demo!" })}>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main
          className="flex-1 p-8 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/5604765/pexels-photo-5604765.jpeg')" }}
        >
          <TodoApp onTasksChange={handleTasksChange} />
        </main>
      </div>
    </div>
  );
}
