'use client';
import { Asterisk, Divide } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Header = () => {
  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 bg-background`}>
        <div className="mx-auto flex items-center gap-12 p-4">
          {/* Logo placeholder */}
          <Link href={'/'}>
            <button className="hover: flex items-center gap-2">
              <Divide className="h-5 w-5" strokeWidth={3} />
              <h1 className="font-semibold">COMMON</h1>
            </button>
          </Link>

          {/* Navigation */}
          <div className="flex flex-1">
            {/* Desktop Menu - hidden on  mobile*/}
            <div className="hidden md:flex md:items-center md:gap-8">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          {/* right buttons --- CONDITIONAL BASED ON IF YOU HAVE A ACCOUNT */}
          <div className="flex flex-row gap-2">
            <Button size={'sm'} className="" variant={'outline'}>
              Log in
            </Button>
            <Button size={'sm'} className="gap-1">
              Get all-access
              <Asterisk strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
      </header>
    </>
  );
};

const menuItems = [
  { name: 'Browse', href: '/details/pricing' },
  { name: 'About', href: '/details/about' },
  {
    name: 'Pricing',
    href: '/',
  },
];

export default Header;
