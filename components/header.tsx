import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './themeToggle';
import { Button } from './ui/button';

const Header = () => {
  return (
    <>
      <header className={'fixed left-0 right-0 top-0 z-50 bg-background/25 backdrop-blur-md'}>
        <div className="mx-auto flex items-center gap-12 px-4 py-2">
          {/* Logo placeholder */}
          <Link href={'/'}>
            <div className="flex items-center">
              <Asterisk className="h-5 w-5" strokeWidth={3} />
              <h1 className="font-semibold">COMMON</h1>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex flex-1" />
          {/* <div className="flex flex-1"> */}
          {/* Desktop Menu - hidden on  mobile*/}
          {/* <div className="hidden md:flex md:items-center md:gap-8">
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
          </div> */}
          {/* right buttons --- CONDITIONAL BASED ON IF YOU HAVE A ACCOUNT */}
          <div className="flex flex-row gap-2">
            <ThemeToggle />
            <Link href={'/login'}>
              <Button size={'sm'} className="" variant={'outline'}>
                Log in
              </Button>
            </Link>

            <Link href="/pricing">
              <Button
                size={'sm'}
                className="gap-1 pr-2"
                // onClick={() => {
                //   // router.push('/pricing');
                // }}
              >
                Get all-access
                <Asterisk strokeWidth={2} className="" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
      </header>
    </>
  );
};

export default Header;
