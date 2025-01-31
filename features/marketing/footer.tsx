import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../../components/ui/separator';

const MarketingFooter = () => {
  return (
    <footer className="flex flex-col gap-5 p-10">
      <CompanyInfo />
      <Separator />
      <Rights />
    </footer>
  );
};

export default MarketingFooter;

/* ------------------------------ comapny info ------------------------------ */

// TODO: constant Links
const menuItems = [
  { name: 'About', href: '/details/about' },
  { name: 'Browse', href: '/details/pricing' },
  { name: 'Contact', href: '/details/contact' },
  {
    name: 'Pricing',
    href: '/',
  },
];

function CompanyInfo() {
  return (
    <div className="flex flex-col gap-2">
      {/* logo */}
      <div className="flex flex-row items-center gap-0">
        <Asterisk className="h-6 w-6" />
        <h4 className="text-lg font-bold">COMMON PROJECT</h4>
      </div>
      {/* description w/ links */}
      <div className="flex flex-row justify-between">
        <p className="max-w-xs text-sm text-muted-foreground">
          Essential 2D Designs, Instant Search, Drag and Drop. Made for Productivity.
        </p>
        <div className="flex gap-8">
          {menuItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- rights --------------------------------- */
function Rights() {
  return (
    <div className="flex items-center text-xs text-muted-foreground">
      <div className="flex flex-1 flex-row items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Copyright Common Project. All rights reserved.</p>
      </div>
      <div className="flex flex-row items-center gap-8">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>
    </div>
  );
}
