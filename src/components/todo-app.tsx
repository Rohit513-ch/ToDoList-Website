"use client";

import { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, Calendar as CalendarIcon, MoreHorizontal } from 'lucide-react';
import { format } from "date-fns";
import { useToast } from '@/hooks/use-toast';

const initialTasks: Task[] = [
  { id: '1', title: 'Team Meeting', description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfi.', time: '10:30 AM - 12:00 PM', completed: false, color: 'bg-blue-100' },
  { id: '2', title: 'Work on Branding', description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfi.', time: '10:30 AM - 12:00 PM', completed: false, color: 'bg-purple-100' },
  { id: '3', title: 'Make a Report for client', description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfi.', time: '10:30 AM - 12:00 PM', completed: false, color: 'bg-yellow-100' },
  { id: '4', title: 'Create a planer', description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfi.', time: '10:30 AM - 12:00 PM', completed: false, color: 'bg-pink-100' },
  { id: '5', title: 'Create Treatment Plan', description: 'Lorem ipsum dolor sit amet, consectetur elit lddv nlorem idjsfjfi.', time: '10:30 AM - 12:00 PM', completed: false, color: 'bg-green-100' },
  { id: '6', title: 'Review PRs', description: 'Review the pull requests from the team.', time: '02:00 PM - 03:00 PM', completed: true, color: 'bg-gray-100' },
];

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState<Date>(new Date(2025, 1, 21));
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setTasks(initialTasks);
        }
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
        setTasks(initialTasks);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load tasks. Using default list.",
        });
      }
    }
  }, [isClient, toast]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isClient]);


  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button suppressHydrationWarning variant="outline" className="w-full sm:w-64 justify-start text-left font-normal text-gray-600">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "do LLL, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => setDate(d || new Date())}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            suppressHydrationWarning
            placeholder="Search List" 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button suppressHydrationWarning className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-5 w-5" />
          Add New List
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Task</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
            ))}
          </div>
            {activeTasks.length === 0 && <p className="text-center text-gray-500 mt-10">No active tasks found.</p>}
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
            ))}
          </div>
            {completedTasks.length === 0 && <p className="text-center text-gray-500 mt-10">No completed tasks found.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TaskCard({ task, onToggleComplete, onDelete }: { task: Task; onToggleComplete: (id: string) => void; onDelete: (id: string) => void; }) {
  return (
    <div className={`p-5 rounded-2xl shadow-sm ${task.color}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Checkbox 
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <label htmlFor={`task-${task.id}`} className={`font-bold text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </label>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1">
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-500 focus:bg-red-50 focus:text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className={`mt-2 text-sm text-gray-600 pl-8 ${task.completed ? 'line-through text-gray-500' : ''}`}>
        {task.description}
      </p>
      <p className={`mt-4 text-sm font-medium text-gray-700 pl-8 ${task.completed ? 'line-through text-gray-500' : ''}`}>
        {task.time}
      </p>
    </div>
  );
}
