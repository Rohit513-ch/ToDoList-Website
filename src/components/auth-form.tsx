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
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const AppleSvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <title>Apple</title>
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
    <path d="M10 2c1 .5 2 2 2 5"/>
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
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    setLoading(false)
    toast({ title: "Login Successful", description: "Welcome back!" })
    router.push("/todo")
  }

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true)
    console.log("Signing up with:", values)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    setLoading(false)
    toast({
      title: "Account Created",
      description: "Welcome to TaskZen!",
    })
    router.push("/todo")
  }

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 rounded-none border-b">
        <TabsTrigger
          value="login"
          className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          suppressHydrationWarning
                          placeholder="m@example.com"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          suppressHydrationWarning
                          type="password"
                          placeholder="••••••••"
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
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
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
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input suppressHydrationWarning placeholder="First Name" {...field} />
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input suppressHydrationWarning placeholder="Last name" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input suppressHydrationWarning placeholder="m@example.com" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            suppressHydrationWarning
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
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
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
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
                <Button suppressHydrationWarning type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create account"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or register with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-card hover:bg-secondary text-card-foreground" type="button" disabled={loading}>
                     <GoogleSvgIcon className="mr-2 h-4 w-4" />
                     Google
                  </Button>
                  <Button variant="outline" className="bg-card hover:bg-secondary text-card-foreground" type="button" disabled={loading}>
                     <AppleSvgIcon className="mr-2 h-4 w-4" />
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
