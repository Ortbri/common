import Link from 'next/link';
import { SignUpForm } from '../../../components/forms/signup';

export default function SignupPage() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter details below to create your account
        </p>
      </div>
      <SignUpForm />
      <div className="text-balance text-center text-sm text-muted-foreground">
        Alreadzy have an account?{' '}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Log in
        </Link>
      </div>
    </div>
  );
}
