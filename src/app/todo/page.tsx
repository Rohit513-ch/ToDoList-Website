"use client";

import { useState } from 'react';
import Link from 'next/link';
import { TodoApp } from '@/components/todo-app';
import { LayoutGrid, Users, ListTodo, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function TodoPage() {
  const [teamMatesOpen, setTeamMatesOpen] = useState(true);
  const [todoListOpen, setTodoListOpen] = useState(true);
  
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col">
          <div className="flex items-center h-20 px-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <ListTodo className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">TaskZen</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            
            <Button variant="ghost" className="w-full justify-start h-12 text-base font-medium text-gray-600 hover:bg-gray-100">
              <LayoutGrid className="w-5 h-5 mr-3" /> Overview
            </Button>
            
            <div>
              <Button variant="ghost" onClick={() => setTeamMatesOpen(!teamMatesOpen)} className="w-full justify-start h-12 text-base font-medium text-gray-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-3" /> Team Mates
                <div className="ml-auto">
                  {teamMatesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
              {teamMatesOpen && (
                <div className="pl-12 pt-2 space-y-3 text-sm text-gray-500">
                  <p className="cursor-pointer hover:text-gray-900">Akash Singh</p>
                  <p className="cursor-pointer hover:text-gray-900">Vaibhav Kumar</p>
                  <p className="cursor-pointer hover:text-gray-900">Piyush Raj</p>
                  <p className="cursor-pointer hover:text-gray-900">Nitesh Rajput</p>
                </div>
              )}
            </div>

            <div>
              <Button variant="ghost" onClick={() => setTodoListOpen(!todoListOpen)} className="w-full justify-start h-12 text-base font-medium bg-blue-50 text-blue-700 hover:bg-blue-100">
                <ListTodo className="w-5 h-5 mr-3" /> Todo List
                <div className="ml-auto">
                  {todoListOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
              {todoListOpen && (
                <div className="pl-12 pt-2 space-y-3 text-sm text-gray-500">
                  <p className="cursor-pointer hover:text-gray-900">Team Meeting</p>
                  <p className="cursor-pointer hover:text-gray-900">Work on Branding</p>
                  <p className="cursor-pointer hover:text-gray-900">Make a Report for client</p>
                  <p className="cursor-pointer hover:text-gray-900">Create a planer</p>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-100">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://placehold.co/48x48.png" alt="User Avatar" data-ai-hint="profile picture" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-8">
          <TodoApp />
        </main>
      </div>
    </div>
  );
}
