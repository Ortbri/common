'use client';

import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function Home() {
  return (
    <div>
      <HomeCTA />
      {/* <BodyNow /> */}
    </div>
  );
}

function HomeCTA() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center pt-24">
      {/* Content */}
      <div className="flex flex-col space-y-6 px-4 text-center">
        {/* IDEA MOTION 360 of container - then MOTION OF ASTERICS 360 */}
        {/* <div className="h-6 w-6 rounded-sm bg-card-foreground">
            <Asterisk strokeWidth={2} color="#fff" />
          </div> */}
        {/* MOTION here */}
        <h1 className="text-5xl font-semibold tracking-tighter lg:text-5xl">
          <span className="">Ready to use</span>
          <br />
          Essential 2D Designs
        </h1>
        <p className="max-w-[400] text-muted-foreground">
          Featuring 500+ Essential 2D Designs | Instant Search | Drag and Drop | New Content
          Monthly.
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
        {/*  input form */}
        {/* submit form */}

        {/* made by */}
        <div className="flex flex-col items-center gap-2">
          {/* <p className="pb-4 text-xs text-muted-foreground">Made by</p> */}
          {/* <MadeBy /> */}
        </div>
      </div>
    </div>
  );
}
