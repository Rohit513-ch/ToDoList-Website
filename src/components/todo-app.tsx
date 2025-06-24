"use client";

import { useState, useEffect, FormEvent } from 'react';
import type { Task } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Trash2, Pencil, Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
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
        }
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load tasks from your browser.",
        });
      }
    }
  }, [isClient, toast]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Task cannot be empty.",
      });
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleSaveEdit = (id: string) => {
    if (editingText.trim() === '') {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Task cannot be empty.",
      });
      return;
    }
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editingText.trim() } : task
    ));
    handleCancelEdit();
  };
  
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">My To-Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" /> Add Task
          </Button>
        </form>
        
        <div className="space-y-3">
          {isClient && tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-md transition-all duration-300 bg-secondary/50 hover:bg-secondary">
                {editingTaskId === task.id ? (
                  <>
                    <Input 
                      type="text" 
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-grow"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                    />
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => handleSaveEdit(task.id)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleComplete(task.id)}
                    />
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`flex-grow text-sm transition-colors ${task.completed ? 'text-muted-foreground line-through' : ''}`}
                    >
                      {task.text}
                    </label>
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => handleStartEdit(task)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Your to-do list is empty.</p>
              <p className="text-sm">Add a task to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
      {isClient && tasks.length > 0 && (
         <CardFooter className="text-sm text-muted-foreground justify-center border-t pt-6">
          <p>{completedCount} of {tasks.length} tasks completed.</p>
        </CardFooter>
      )}
    </Card>
  );
}
