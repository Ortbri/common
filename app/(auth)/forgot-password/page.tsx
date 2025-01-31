import Link from 'next/link';
import { ForgotPasswordForm } from '../../../components/forms/forgot-password';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Password Reset</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Submit your email for password reset
        </p>
      </div>
      <ForgotPasswordForm />
      <div className="text-balance text-center text-sm text-muted-foreground">
        Go back to{' '}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Log in
        </Link>
      </div>
    </div>
  );
}
