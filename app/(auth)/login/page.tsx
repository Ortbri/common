import Link from 'next/link';
import { LoginForm } from '../../../components/forms/login';

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and password to Login
        </p>
      </div>
      <LoginForm />
      <div className="flex flex-col items-center gap-8">
        <Link
          href="/forgot-password"
          className="text-sm text-foreground underline underline-offset-4"
        >
          Forgot Password?
        </Link>
        <p className="text-balance text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
