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
      <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.62-3.85 1.62-4.64 0-8.59-3.96-8.59-8.6 0-4.64 3.95-8.6 8.59-8.6 2.5 0 4.13 1.02 5.39 2.18l2.6-2.6C18.96 3.2 16.2 2 12.48 2 5.6 2 .96 7.6 .96 14.5s4.63 12.5 11.52 12.5c3.28 0 5.76-1.11 7.59-2.95 1.9-1.9 2.53-4.85 2.53-7.59 0-.96-.08-1.44-.2-1.92H12.48z"
          fill="currentColor"
      />
  </svg>
)

const AppleSvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Apple</title>
      <path
          d="M12.023 6.683c.012-.001.023-.002.034-.003l.053-.005c1.725-.17 3.203-1.048 4.134-2.428a.5.5 0 01.655-.22c.2.06.342.235.39.452.072.324-.246.9-.62 1.546-1.133 1.93-2.99 3.193-5.116 3.193h-.002c-.01 0-.02.001-.03.001H11.5c-1.666.163-3.085 1.04-3.974 2.328-.903 1.305-.986 2.871-.247 4.28.74 1.41 2.074 2.396 3.568 2.406h.023c1.474 0 2.795-.923 3.522-2.28a.5.5 0 01.65.233c.12.23.05.513-.153.68-1.12 1.025-2.585 1.815-4.242 1.815h-.023c-2.19 0-3.996-1.333-4.895-2.955-.9-1.624-.65-3.664.577-5.289.87-1.25 2.12-2.15 3.555-2.315Z"
          fill="currentColor"
      />
      <path
          d="M18.835 8.163c.002.012.003.024.004.036v.056c-.19 1.68-1.21 3.23-2.696 4.226a.5.5 0 01-.527.027.5.5 0 01-.22-.656c.928-1.312 1.58-2.674 1.748-4.143v-.047c.01-.08.02-.16.03-.24a.5.5 0 01.465-.453c.245-.03.47.146.505.385l.04.173Z"
          fill="currentColor"
      />
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
                          <Input suppressHydrationWarning placeholder="Fletcher" {...field} />
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
                  <Button variant="outline" type="button" disabled={loading}>
                     <GoogleSvgIcon className="mr-2 h-4 w-4" />
                     Google
                  </Button>
                  <Button variant="outline" type="button" disabled={loading}>
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
