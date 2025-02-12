'use client';

import { Asterisk } from 'lucide-react';
import { Button } from './ui/button';

async function handleSubscription() {
  try {
    const response = await fetch('/api/stripe/checkout');

    if (!response.ok) {
      if (response.status === 302 || response.redirected) {
        // Handle redirect
        window.location.href = response.headers.get('Location') || '/';
        return;
      }
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error('Error:', error);
    // Fallback redirect
    window.location.href = '/';
  }
}

export default function SubButton() {
  return (
    <Button onClick={handleSubscription} className="mt-8 w-full rounded-3xl" size={'lg'}>
      Get All Access
      <Asterisk strokeWidth={2} className="h-4 w-4" />
    </Button>
  );
}
