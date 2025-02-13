'use client';

import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '../../actions/stripe/createStripePortal';
import { Button } from '../../components/ui/button';

function SubPortalButton() {
  const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const result = await createStripePortal();

      if (result?.url) {
        // window.location.href = result.url;
        redirect(result.url);
      } else if (result?.error) {
        console.error('Error creating portal:', result.error);
        // Optionally display an error message to the user
        alert(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleManageSubscription} disabled={isLoading} className="rounded-3xl">
      Manage Subscription
      {isLoading && <LoaderCircle strokeWidth={2} className="h-4 w-4 animate-spin" />}
    </Button>
  );
}

export default SubPortalButton;
