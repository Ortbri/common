import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/utils';

export default function SignupPage() {
  return (
    <div className="grid min-h-svh pt-12 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-primary lg:block">
        <div className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}

function SignupForm() {
  return (
    <form className={cn('flex flex-col gap-6')} action="/api/auth/signup">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="first-name">First name</Label>
          <Input name="first-name" type="text" placeholder="Daniel" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input name="last-name" type="text" placeholder="Lim" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
