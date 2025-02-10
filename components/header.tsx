import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const MarketingHeader = () => {
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
            <Link href={'/pricing'} className="text-xs">
              Pricing
            </Link>
            <Link href={'/login'} className="text-xs">
              Log in
            </Link>
            <Link href={'/signup'}>
              <Button className="gap-1 whitespace-nowrap rounded-3xl" size={'sm'}>
                Join for Free
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default MarketingHeader;
