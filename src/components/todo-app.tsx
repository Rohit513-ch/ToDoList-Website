"use client";

import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import type { Task } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  }
  
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="max-w-2xl mx-auto shadow-xl rounded-2xl bg-card p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center font-headline">To-Do List App</h1>
      </div>
      
      <div>
        <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-grow h-12 text-base"
          />
          <Button type="submit" size="lg" className="h-12 bg-primary hover:bg-primary/90 font-semibold">
            <Plus className="h-5 w-5 mr-2" /> Add Task
          </Button>
        </form>
        
        <div className="space-y-4">
          {isClient && tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 bg-secondary/60 border border-transparent hover:border-border">
                {editingTaskId === task.id ? (
                  <>
                    <Input 
                      type="text" 
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-grow"
                      autoFocus
                      onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                    />
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => handleSaveEdit(task.id)}>
                      <Save className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-muted-foreground/80" onClick={handleCancelEdit}>
                      <X className="h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleComplete(task.id)}
                      className="h-5 w-5"
                    />
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`flex-grow cursor-pointer transition-colors ${task.completed ? 'text-muted-foreground line-through' : 'text-card-foreground'}`}
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
            <div className="text-center text-muted-foreground py-10">
              <p className="text-lg mb-2">Your to-do list is empty.</p>
              <p>Add a task above to get started!</p>
            </div>
          )}
        </div>
      </div>
      
      {isClient && tasks.length > 0 && (
         <div className="text-sm text-muted-foreground text-center border-t pt-6 mt-8">
          <p>{completedCount} of {tasks.length} tasks completed.</p>
        </div>
      )}
    </div>
  );
}
