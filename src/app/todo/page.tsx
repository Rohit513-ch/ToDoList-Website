"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TodoApp } from '@/components/todo-app';
import { LayoutGrid, Users, ListTodo, Bell, ChevronDown, ChevronUp } from 'lucide-react';
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

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export default function TodoPage() {
  const [teamMatesOpen, setTeamMatesOpen] = useState(true);
  const [todoListOpen, setTodoListOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] dark:bg-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex h-full flex-col">
          <div className="flex items-center h-20 px-6 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <ListTodo className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">TaskZen</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            
            <Button variant="ghost" className="w-full justify-start h-12 text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <LayoutGrid className="w-5 h-5 mr-3" /> Overview
            </Button>
            
            <div>
              <Button variant="ghost" onClick={() => setTeamMatesOpen(!teamMatesOpen)} className="w-full justify-start h-12 text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Users className="w-5 h-5 mr-3" /> Team Mates
                <div className="ml-auto">
                  {teamMatesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
              {teamMatesOpen && (
                <div className="pl-12 pt-2 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Akash Singh</p>
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Vaibhav Kumar</p>
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Piyush Raj</p>
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Nitesh Rajput</p>
                </div>
              )}
            </div>

            <div>
              <Button variant="ghost" onClick={() => setTodoListOpen(!todoListOpen)} className="w-full justify-start h-12 text-base font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900">
                <ListTodo className="w-5 h-5 mr-3" /> Todo List
                <div className="ml-auto">
                  {todoListOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
              {todoListOpen && (
                <div className="pl-12 pt-2 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Team Meeting</p>
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Work on Branding</p>
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Make a Report for client</p>
                  <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">Create a planer</p>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Todo List</h1>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
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
                  <DropdownMenuItem onClick={() => toast({ title: "This is just a demo!" })}>
                    Profile
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
        <main className="flex-1 p-8 bg-background">
          <TodoApp />
        </main>
      </div>
    </div>
  );
}
