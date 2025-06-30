"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function AuthForm() {
  const [mode, setMode] = useState<"signup" | "login">("signup");

  return (
    <div className="w-full max-w-md text-white">
      {mode === "signup" ? (
        <SignUpForm setMode={setMode} />
      ) : (
        <LoginForm setMode={setMode} />
      )}
    </div>
  );
}

function SignUpForm({ setMode }: { setMode: (mode: "login") => void }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true);
    console.log("Signing up with:", values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Account Created",
      description: "Welcome to TaskZen!",
    });
    router.push("/todo");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Create an account</h1>
      <p className="mt-2 text-neutral-400">
        Already have an account?{" "}
        <button onClick={() => setMode("login")} className="text-purple-400 hover:underline">
          Log in
        </button>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input suppressHydrationWarning placeholder="First name" {...field} className="bg-[#3b385a] border-neutral-600 placeholder:text-neutral-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input suppressHydrationWarning placeholder="Last name" {...field} className="bg-[#3b385a] border-neutral-600 placeholder:text-neutral-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input suppressHydrationWarning placeholder="Email" {...field} className="bg-[#3b385a] border-neutral-600 placeholder:text-neutral-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      suppressHydrationWarning
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="bg-[#3b385a] border-neutral-600 placeholder:text-neutral-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-neutral-600 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-neutral-300">
                    I agree to the <a href="#" className="text-purple-400 hover:underline">Terms & Conditions</a>
                  </FormLabel>
                   <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button suppressHydrationWarning type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>
      
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#2C2A4A] px-2 text-neutral-400">Or register with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button suppressHydrationWarning variant="outline" className="bg-[#3b385a] border-neutral-600 hover:bg-[#4c4974] hover:text-white">
          <GoogleIcon className="mr-2 h-5 w-5" />
          Google
        </Button>
        <Button suppressHydrationWarning variant="outline" className="bg-[#3b385a] border-neutral-600 hover:bg-[#4c4974] hover:text-white">
          <AppleIcon className="mr-2 h-5 w-5 fill-white" />
          Apple
        </Button>
      </div>
    </div>
  );
}

function LoginForm({ setMode }: { setMode: (mode: "signup") => void }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    console.log("Logging in with:", values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast({ title: "Login Successful", description: "Welcome back!" });
    router.push("/todo");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Log in</h1>
      <p className="mt-2 text-neutral-400">
        Don't have an account?{" "}
        <button onClick={() => setMode("signup")} className="text-purple-400 hover:underline">
          Create an account
        </button>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input suppressHydrationWarning placeholder="Email" {...field} className="bg-[#3b385a] border-neutral-600 placeholder:text-neutral-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      suppressHydrationWarning
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="bg-[#3b385a] border-neutral-600 placeholder:text-neutral-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button suppressHydrationWarning type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.651-3.657-11.303-8h-6.843v.09C7.344 33.91 15.143 40 24 40c.083 0 .167.001.25.001z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M19.33.24a4.18 4.18 0 0 0-3.34 1.95A4.2 4.2 0 0 0 12.65.2c-1.66 0-3.23.98-4.22 2.65a5.52 5.52 0 0 0-1.55 4.31c0 2.27.94 4.45 2.21 5.92 1.15 1.34 2.5 2.15 4.09 2.15 1.58 0 2.54-.78 4.08-2.16a5.45 5.45 0 0 0 2.1-3.75c.03-2.12-1.2-3.8-3.05-4.87a.3.3 0 0 1-.16-.36c.1-.3.26-.6.44-.88.24-.37.38-.8.38-1.25a2.53 2.53 0 0 0-2.4-2.5zm-5.69 16.58a2.53 2.53 0 0 0 1.76 2.36 2.56 2.56 0 0 0 2.7-1.46 6.3 6.3 0 0 1-4.46-.9zM12 .52c.04 0 .08.02.13.04a4.57 4.57 0 0 1 2.67 4.5c0 2.5-1.9 4.34-4.2 4.34-2.27 0-4.14-1.88-4.14-4.34a4.43 4.43 0 0 1 2.87-4.25A4.94 4.94 0 0 1 12 .52z"/>
    </svg>
  );
}
