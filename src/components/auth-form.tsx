"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const GoogleSvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.021,35.591,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
)

const AppleSvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <title>Apple</title>
      <path d="M12.15,2.5a.55.55,0,0,0-.5.23c-1,1.14-2.5,2.83-2.5,4.84a4.89,4.89,0,0,1,1.82-1.1,4.44,4.44,0,0,1,2.5-.2,4.28,4.28,0,0,1,3.45,2.3c-.05,0-.1,0-.15,0a5.3,5.3,0,0,0-4-2.14A4.3,4.3,0,0,0,12.15,2.5Zm5.62,10.15c.13-.17.25-.33.38-.5a4.29,4.29,0,0,0,1-3.32,4.47,4.47,0,0,0-3.23-4.23,4.88,4.88,0,0,0-4.6,2.73,4.55,4.55,0,0,0-1.28,3.22c0,2.5,1.52,4.22,3.31,4.22a4.42,4.42,0,0,0,3.3-1.63C17.65,12.82,17.7,12.65,17.77,12.65Z"></path>
      <path d="M14.28,21.49a4.87,4.87,0,0,1-2.28.51,4.54,4.54,0,0,1-2.73-1,4.87,4.87,0,0,1-2-3.21c-2-1.29-2.73-3.48-2.73-5.32a6.19,6.19,0,0,1,2.37-5,6.66,6.66,0,0,1,5.21-2.14,4.28,4.28,0,0,1,1.37.2,1,1,0,0,0,.7-.18,3.75,3.75,0,0,1,2.87-1.18,4.53,4.53,0,0,1,4.35,4.42c0,3.11-2.1,6.5-4.26,6.5a4.8,4.8,0,0,1-3.23-1.63c-.17,0-.34,0-.5,0a5,5,0,0,0-.48.05A4.29,4.29,0,0,0,14.28,21.49Z"></path>
    </svg>
  );

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

export function AuthForm() {
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", terms: false },
  })

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true)
    console.log("Logging in with:", values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const user = {
      email: values.email,
      firstName: 'John',
      lastName: 'Doe',
      joinedDate: new Date().toISOString(),
      avatar: 'https://i.ibb.co/NbzvwCN/profile-pic.jpg',
    };
    localStorage.setItem('user', JSON.stringify(user));

    setLoading(false)
    toast({ title: "Login Successful", description: "Welcome back!" })
    router.push("/todo")
  }

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true)
    console.log("Signing up with:", values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const user = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      joinedDate: new Date().toISOString(),
      avatar: 'https://i.ibb.co/NbzvwCN/profile-pic.jpg',
    };
    localStorage.setItem('user', JSON.stringify(user));

    setLoading(false)
    toast({
      title: "Account Created",
      description: "Welcome to TaskZen!",
    })
    router.push("/todo")
  }

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 rounded-none border-b border-white/20">
        <TabsTrigger
          value="login"
          className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-white text-gray-400 data-[state=active]:text-white"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-white text-gray-400 data-[state=active]:text-white"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your credentials to access your to-do list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          suppressHydrationWarning
                          placeholder="m@example.com"
                          className="bg-transparent border-white/30 text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          suppressHydrationWarning
                          type="password"
                          placeholder="••••••••"
                          className="bg-transparent border-white/30 text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button suppressHydrationWarning type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Sign Up</CardTitle>
            <CardDescription className="text-gray-300">
              Create an account to start managing your tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={signupForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-white">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} className="bg-transparent border-white/30 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-white">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} className="bg-transparent border-white/30 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} className="bg-transparent border-white/30 text-white placeholder:text-gray-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            className="bg-transparent border-white/30 text-white placeholder:text-gray-400"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                          >
                            {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          I agree to the{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Terms & Conditions
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create account"}
                </Button>

                <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-white/20" />
                    <span className="text-xs uppercase text-gray-400">Or register with</span>
                    <div className="flex-1 border-t border-white/20" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-card text-card-foreground border-border hover:bg-accent" type="button" disabled={loading}>
                     <GoogleSvgIcon className="mr-2 h-5 w-5" />
                     Google
                  </Button>
                  <Button variant="outline" className="bg-card text-card-foreground border-border hover:bg-accent" type="button" disabled={loading}>
                     <AppleSvgIcon className="mr-2 h-5 w-5" />
                     Apple
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
