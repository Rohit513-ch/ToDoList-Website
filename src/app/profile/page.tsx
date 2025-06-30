import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="text-4xl font-bold">Profile Page</h1>
      <p className="mt-4 text-muted-foreground">This page is under construction.</p>
      <Button asChild className="mt-6">
        <Link href="/todo">
          Go back to To-Do List
        </Link>
      </Button>
    </div>
  );
}
