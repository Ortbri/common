'use client';
import { Divide } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200`}>
        <div className="mx-auto flex items-center justify-between px-4 py-4 lg:p-6">
          {/* Logo placeholder */}
          <Divide className="h-5 w-5" />

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full border border-gray-200 bg-white p-2 dark:bg-black md:hidden"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white p-4 shadow-lg dark:bg-black md:hidden">
            <nav className="flex flex-col space-y-4">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

const menuItems = [
  { name: 'Pricing', href: '/details/pricing' },
  { name: 'About', href: '/details/about' },
  { name: 'Login', href: '/login' },
];

export default Header;
