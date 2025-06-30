
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, LogOut, Moon, Sun, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: string;
  avatar: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUsername(`${parsedUser.firstName} ${parsedUser.lastName}`);
    } else {
      router.push('/login');
    }

    const storedTheme = localStorage.getItem('theme');
    const darkMode = storedTheme === 'dark';
    setIsDark(darkMode);
  }, [router]);

  const handleThemeToggle = (checked: boolean) => {
    setIsDark(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', checked);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    toast({ title: 'Logged out successfully' });
    router.push('/login');
  };

  const handleUsernameSave = () => {
    if (user && username.trim()) {
        const nameParts = username.trim().split(' ');
        const updatedUser = {
            ...user,
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(' ') || '',
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast({ title: 'Username updated!' });
        setIsEditingUsername(false);
    } else {
        toast({ variant: 'destructive', title: 'Username cannot be empty.' });
    }
  };


  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto max-w-4xl py-8 sm:py-12">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/todo">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Link>
        </Button>
        <Card className="w-full">
          <CardHeader className="text-center border-b">
            <div className="relative mx-auto mb-4 h-24 w-24">
              <Avatar className="h-full w-full">
                <AvatarImage src={user.avatar} alt={username} />
                <AvatarFallback>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl">{username}</CardTitle>
            <CardDescription>
              Joined on {format(new Date(user.joinedDate), 'MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">User Information</h3>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} readOnly disabled />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="username">Username</Label>
                 <div className="flex gap-2">
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!isEditingUsername} />
                    {isEditingUsername ? (
                        <Button onClick={handleUsernameSave}>Save</Button>
                    ) : (
                        <Button variant="outline" size="icon" onClick={() => setIsEditingUsername(true)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                    )}
                 </div>
                 <p className="text-sm text-muted-foreground">Click the pencil to edit your display name.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Change Password</h3>
               <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="new-password">New Password</Label>
                   <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
              <Button onClick={() => toast({ title: 'Password updated!', description: 'Just kidding, this is a demo.' })}>
                Update Password
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span>Dark Mode</span>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Button onClick={handleLogout} variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
