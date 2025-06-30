"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Pencil, ListTodo, Info } from 'lucide-react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // This code runs only on the client
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

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
              <div>
                <Label className="text-sm text-muted-foreground">Access level</Label>
                <div className="mt-1">
                  <span className="inline-block px-4 py-1.5 border border-primary rounded-md text-primary font-semibold">
                    Manager
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* User Information */}
            <section>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-muted-foreground">User information</h2>
                  <p className="text-4xl font-bold mt-1">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</p>
                </div>
                <Button variant="outline">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <p id="email" className="text-lg">{user?.email}</p>
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <p id="username" className="text-lg">@{user?.email?.split('@')[0]}</p>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value="************" readOnly className="mt-1 bg-background/50 border-border/50 text-lg" />
                </div>
                <div>
                  <Label className="flex items-center" htmlFor="2fa-label">
                    Two-Factor Authentication
                    <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                  </Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Switch id="2fa-app" defaultChecked />
                    <Label htmlFor="2fa-app" className="text-muted-foreground">App</Label>
                    <Switch id="2fa-email" />
                    <Label htmlFor="2fa-email" className="text-muted-foreground">Email</Label>
                  </div>
                </div>
              </div>
            </section>
            
            <Separator className="bg-border/20" />

            {/* Permissions */}
            <section>
              <h2 className="text-lg font-semibold text-muted-foreground mb-6">Permissions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center justify-between p-3 bg-card/5 rounded-lg">
                  <Label htmlFor="access-analytics" className="text-base">Access analytics</Label>
                  <Switch id="access-analytics" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-card/5 rounded-lg">
                  <Label htmlFor="manage-user-roles" className="text-base">Manage user roles</Label>
                  <Switch id="manage-user-roles" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-card/5 rounded-lg">
                  <Label htmlFor="view-audit-logs" className="text-base">View audit logs</Label>
                  <Switch id="view-audit-logs" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-card/5 rounded-lg">
                  <Label htmlFor="manage-billing" className="text-base">Manage billing</Label>
                  <Switch id="manage-billing" />
                </div>
                <div className="flex items-center justify-between p-3 bg-card/5 rounded-lg">
                  <Label htmlFor="edit-system-settings" className="text-base">Edit system settings</Label>
                  <Switch id="edit-system-settings" />
                </div>
                <div className="flex items-center justify-between p-3 bg-card/5 rounded-lg">
                  <Label htmlFor="upgrade-or-downgrade-plans" className="text-base">Upgrade or downgrade plans</Label>
                  <Switch id="upgrade-or-downgrade-plans" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
