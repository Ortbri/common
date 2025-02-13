import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '../utils/supabase/server';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

const MarketingHeader = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user);
  // TODO:if you have a subscription, no pricing item shows there!

  return (
    <>
      <header
        className={
          'fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-lg bg-border/50 backdrop-blur-3xl sm:mt-4 sm:rounded-3xl'
        }
      >
        <div className="mx-auto flex items-center gap-12 py-2 pl-4 pr-2">
          {/* Logo placeholder */}
          <Link href={'/'}>
            <div className="flex flex-1 items-center">
              <Asterisk className="h-5 w-5" strokeWidth={3} />
            </div>
          </Link>
          {/* Links */}
          <div className="flex flex-1 flex-row items-center justify-end gap-4">
            {/* if subscribed show pricing */}
            <Link href={'/pricing'} className="text-xs">
              Pricing
            </Link>
            {user ? (
              <Link href={'/user'}>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-foreground text-sm text-card">
                    {user.user_metadata.first_name.charAt(0) +
                      user.user_metadata.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <>
                <Link href={'/login'} className="text-xs">
                  Log in
                </Link>
                <Link href={'/signup'}>
                  <Button className="gap-1 whitespace-nowrap rounded-3xl" size={'sm'}>
                    Join for Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default MarketingHeader;
