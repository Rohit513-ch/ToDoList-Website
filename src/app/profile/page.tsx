"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { ListTodo, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  username: string;
  bio: string;
  password?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setUsername(parsedUser.username || '');
        setEmail(parsedUser.email || '');
        setBio(parsedUser.bio || '');
        setPassword(parsedUser.password || '');
    }
  }, []);

  const handleSave = () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "No user data found to save.",
        });
        return;
    }
    const updatedUser: User = {
        ...user,
        username,
        email,
        bio,
        password,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast({
        title: "Success",
        description: "Your profile has been updated.",
    });
  };

  if (!isClient) {
    // Return a loading skeleton on the server and initial client render
    return (
        <div
          className="relative text-white min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.pinimg.com/originals/e1/91/98/e191983c273ade9296e36d4993883a31.jpg')" }}
        >
             <div className="absolute inset-0 bg-black/70" />
        </div>
    );
  }

  return (
    <div
      className="relative text-white min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/e1/91/98/e191983c273ade9296e36d4993883a31.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-white/10">
          <Link href="/todo" className="flex items-center gap-2" prefetch={false}>
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-white">TaskZen</span>
          </Link>
          <Button asChild variant="primary" className="border border-white/30">
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
                  <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                </div>
              </div>
            </aside>

            {/* Right Content */}
            <div className="lg:col-span-3 space-y-8">
              <section className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-md shadow-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">User Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="username" className="text-gray-400">Username</Label>
                      <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-transparent border-white/30 mt-2 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-white/30 mt-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-400">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent border-white/30 mt-2 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                      >
                        {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-gray-400">Bio</Label>
                    <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="bg-transparent border-white/30 mt-2 min-h-[100px] text-white" />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} variant="primary" className="border border-white/30">Save Changes</Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
