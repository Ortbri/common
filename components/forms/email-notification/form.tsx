'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { EmailNotificationSchema } from './schema';

export default function EmailNotificationForm() {
  const form = useForm<z.infer<typeof EmailNotificationSchema>>({
    resolver: zodResolver(EmailNotificationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: z.infer<typeof EmailNotificationSchema>) => {
    // TODO: handle data
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Get notified on launch
        </Button>
      </form>
    </Form>
  );
}
