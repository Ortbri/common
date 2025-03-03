import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

function HomeConditonal() {
  /**
   * TODO:  check cache, or use context?  conditionally show the proper UI
   */

  return (
    <div className="relative flex flex-col items-center justify-center pt-24">
      <div className="flex flex-col items-center space-y-6 px-4 text-center">
        {/* title */}
        <h1 className="animate-fade-up text-5xl font-semibold tracking-tighter opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] lg:text-5xl">
          <span className="">Ready to use</span>
          <br />
          <span className="">Essential DWG 2D Designs</span>
        </h1>
        <p className="animate-fade-up text-muted-foreground max-w-400 opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          Featuring 500+ Essential 2D DWG Files | Instant Search | New Content Monthly.
        </p>
        {/* buttons */}
        <div className="animate-fade-up flex flex-1 items-center justify-center gap-2 opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          <Link href={'/signup'}>
            <Button className="gap-1 rounded-3xl whitespace-nowrap" size={'sm'}>
              Join for Free
            </Button>
          </Link>
          <Link href={'/pricing'}>
            <Button
              className="gap-[6px] rounded-3xl pr-[6px] whitespace-nowrap"
              size={'sm'}
              variant={'outline'}
            >
              See Pricing
              <div className="bg-card-foreground rounded-full p-[2px]">
                <Asterisk strokeWidth={3} className="p-[2px]" color="white" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeConditonal;
