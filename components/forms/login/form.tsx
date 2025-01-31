'use client';

// import { login } from '@/server-actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { login } from '../../../app/(auth)/login/actions';
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { LoginSchema } from './schema';

export default function LoginForm() {
  // const router = useRouter();

  /* ------------------------------- hook forms ------------------------------- */
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  /* ------------------------------- handle form ------------------------------ */
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const response = await login(formData);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    if (response.success) {
      toast.success('Successfully logged in!');
      // setTimeout(() => {
      //   router.push('/account');
      // }, 500);
    }
  };

  /* --------------------------------- return --------------------------------- */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="daniella@gmail.com"
                  type="email"
                  disabled={isSubmitting}
                  {...field}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </Form>
  );
}
