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
        <p className="max-w-[400] animate-fade-up text-muted-foreground opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          Featuring 500+ Essential 2D DWG Files | Instant Search | New Content Monthly.
        </p>
        {/* buttons */}
        <div className="flex flex-1 animate-fade-up items-center justify-center gap-2 opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          <Link href={'/signup'}>
            <Button className="gap-1 whitespace-nowrap rounded-3xl" size={'sm'}>
              Join for Free
            </Button>
          </Link>
          <Link href={'/pricing'}>
            <Button
              className="gap-[6px] whitespace-nowrap rounded-3xl pr-[6px]"
              size={'sm'}
              variant={'outline'}
            >
              See Pricing
              <div className="rounded-full bg-card-foreground p-[2px]">
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
