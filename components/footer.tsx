import { Asterisk } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './themeToggle';
import { Separator } from './ui/separator';

const MarketingFooter = () => {
  return (
    <footer className="mx-auto flex w-full flex-col gap-5 px-10 pb-10 pt-24">
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
    <div className="flex flex-row items-center justify-between gap-2">
      {/* logo */}
      <div className="flex flex-row items-center gap-0">
        <Asterisk className="h-6 w-6" />
        <h4 className="text-lg font-bold">COMMON</h4>
      </div>

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
      <ThemeToggle />
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

// Button code
// <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//   Shimmer
// </button>

// // tailwind.config.js code
// {
//   "animation": {
//     shimmer: "shimmer 2s linear infinite"
//   },
//   "keyframes": {
//     shimmer: {
//       from: {
//         "backgroundPosition": "0 0"
//       },
//       to: {
//         "backgroundPosition": "-200% 0"
//       }
//     }
//   }
// }
