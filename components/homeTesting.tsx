'use client';

import { Asterisk, Download, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';

/**
 * TODO: thinking of use the main route and just having that as the main reoute for browsing, use conditionals for users that are auth vs not
 */

export default function Browse() {
  return (
    <div>
      <CTA />
      <AllAccess />
    </div>
  );
}
/* ----------------------------- call to action ----------------------------- */
function MadeBy() {
  const people = [
    {
      name: 'Anna W',
      // image: '/anna-w.png',
      fallback: 'AW',
    },
    {
      name: 'Brian',
      // image: '/danny-w.png',
      fallback: 'BJ',
    },
    {
      name: 'Danny',
      // image: '/nick-w.png',
      fallback: 'JD',
    },
  ];
  return (
    <div className="relative flex flex-row items-center justify-center gap-2">
      {people.map((person, index) => {
        return (
          <Avatar
            className="absolute right-3 flex h-8 w-8 flex-1 items-center justify-center border-2 border-background object-center"
            key={person.name}
            style={{ transform: `translateX(${index * 28}px)` }}
          >
            {/* <AvatarImage src={person.image} alt={person.name} className="scale-125 object-cover" /> */}
            <AvatarFallback>{person.fallback}</AvatarFallback>
          </Avatar>
        );
      })}
    </div>
  );
}

function CTA() {
  // const { toggleMenu } = useCommandMenuContext();

  return (
    <div className="relative flex flex-col items-center justify-center pt-24">
      {/* Content */}
      <div className="flex flex-col items-center space-y-6 px-4 text-center">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">
          <span className="text-muted-foreground">Ready to use</span>
          <br />
          Simple 2D Designs,
        </h1>
        <p className="max-w-[600px] text-muted-foreground">
          Essential 2D Designs, Instant Search, Drag and Drop. Made for Productivity.
        </p>

        {/* search and CTA button */}
        <div className="flex w-full max-w-lg items-center gap-2">
          <Button className="gap-1 whitespace-nowrap pr-2">
            Get all-access
            <Asterisk strokeWidth={2} />
          </Button>
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search designs..."
              className="py-5 pl-10 pr-12"
              // onClick={toggleMenu}
              readOnly
            />
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="absolute inset-y-0 right-3 flex items-center">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* made by */}
        <div className="flex flex-col items-center gap-2">
          {/* <p className="pb-4 text-xs text-muted-foreground">Made by</p> */}
          <MadeBy />
        </div>
      </div>
    </div>
  );
}
/* ------------------------------- All access ------------------------------- */
function AllAccess() {
  return (
    <div className="p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg border bg-background shadow-xs transition-shadow hover:shadow-md"
          >
            {/* <Image
              src="/dimension.svg"
              alt="Dimension diagram"
              className="h-full w-full object-contain p-4"
              width={100}
              height={100}
            /> */}
            {/* download */}
            <Button
              variant={'secondary'}
              className="absolute bottom-2 right-2 rounded-full"
              size={'icon'}
            >
              <Download />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
