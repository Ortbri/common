import { Download, Search } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Home() {
  return (
    <div>
      <CTA />
      <AllAccess />
    </div>
  );
}

function CTA() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-24">
      {/* Content */}
      <div className="flex flex-col items-center space-y-6 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          <span className="text-muted-foreground">Ready to use</span>
          <br />
          Simple 2D Designs,
        </h1>
        <p className="max-w-[600px] text-muted-foreground">
          A resource for dimensional designs and technical specifications
        </p>

        {/* search */}
        <div className="relative w-full max-w-lg">
          <Input type="text" placeholder="Search designs..." className="py-5 pl-10 pr-12" />
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
    </div>
  );
}
function AllAccess() {
  return (
    <div className="p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src="/dimension.svg"
              alt="Dimension diagram"
              className="h-full w-full object-contain p-4"
              width={100}
              height={100}
            />
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
