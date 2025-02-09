'use client';

import { Asterisk } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

// import HomeSearch from '../../features/marketing/homeSearch';

export default function Home() {
  return (
    <div>
      <HomeCTA />
      <AllAccess />
    </div>
  );
}

// const demoArray = [{ id: 123 }];

function HomeCTA() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-24">
      {/* Content */}
      <div className="flex flex-col items-center space-y-6 px-4 text-center">
        {/* IDEA MOTION 360 of container - then MOTION OF ASTERICS 360 */}
        {/* <div className="h-6 w-6 rounded-sm bg-card-foreground">
            <Asterisk strokeWidth={2} color="#fff" />
          </div> */}
        {/* MOTION here */}
        <h1 className="text-5xl font-semibold tracking-tighter lg:text-5xl">
          <span className="">Ready to use</span>
          <br />
          Essential DWG 2D Designs
        </h1>
        <p className="max-w-[400] text-muted-foreground">
          Featuring 500+ Essential 2D DWG Files | Instant Search | New Content Monthly.
        </p>

        {/* <EmailNotificationForm /> */}

        {/* search and CTA button */}
        <div className="flex w-full max-w-lg flex-1 items-center justify-center gap-2">
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

        <div className="flex flex-col items-center gap-2">
          {/* <p className="pb-4 text-xs text-muted-foreground">Made by</p> */}
          {/* <MadeBy /> */}
        </div>
      </div>
    </div>
  );
}
// function ListDWG() {
//   return <div>test 1 array of items for now</div>;
// }

function AllAccess() {
  return (
    <div className="h-screen p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-3xl border bg-background shadow-sm transition-shadow hover:shadow-md"
          >
            {/* <h1 className="px-4 text-lg">Tittle</h1> */}
            <Image
              src="/dimension.svg"
              alt="Dimension diagram"
              className="h-full w-full object-contain p-4"
              width={100}
              height={100}
            />
          </div>
        ))}
        <div className="absolute bottom-24 h-44 w-full bg-foreground/20" />
      </div>
    </div>
  );
}
