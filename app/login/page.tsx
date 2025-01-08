
import {  signup } from "./actions";
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Image from "next/image";
import ghost from "../../public/ghost.png"




export default function Login() {
	return (
	 <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Image src={ghost} alt="ghost logo"/>

						</div>
						<div>
							<text>
								
            Drawlings Studio</text>
						</div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-primary lg:block">
        
		<div className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"/>
      </div>
    </div>
	);
}


/* -------------------------------------------------------------------------- */
/*                                 signup form                                */
/* -------------------------------------------------------------------------- */
export function SignupForm() {
  return (
    <form className={cn("flex flex-col gap-6")} action={signup}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Start Signup</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to create to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input 
            name="fullName" // Changed from id to name
            type="text"     // Added type="text"
            placeholder="Daniel Lim" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            name="email"   // Changed from id to name
            type="email" 
            placeholder="m@example.com" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            name="password" // Changed from id to name
            type="password" 
            required 
          />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 login form                                 */
/* -------------------------------------------------------------------------- */
export function LoginForm() {
  return (
    <form className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Start Signup</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to create to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="full name">Full name</Label>
          <Input id="fullname" type="" placeholder="Daniel Lim" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" formAction={signup}>
          Signup
        </Button>
        {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div> */}
        {/* <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}
      </div>
      {/* show login form */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </form>
  )
}


/* -------------------------------------------------------------------------- */
/*                              supabase example                              */
/* -------------------------------------------------------------------------- */
// export default function LoginPage() {
//   return (
//     <form className="flex flex-col bg-slate-100">
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
      
//       {/* Add full name field */}
//       <label htmlFor="fullName">Full Name:</label>
//       <input id="fullName" name="fullName" type="text" required />
      
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
      
//       <button type="submit" formAction={login}>
//         Log in
//       </button>
//       <button type="submit" formAction={signup}>
//         Sign up
//       </button>
//     </form>
//   );
// }