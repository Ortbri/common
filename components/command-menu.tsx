'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { DialogTitle } from './ui/dialog';

// Create a custom hook to manage the command menu state
export function useCommandMenu() {
  const [open, setOpen] = React.useState(false);

  const toggleMenu = React.useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return {
    open,
    setOpen,
    toggleMenu,
  };
}

// Create a context to share the command menu state
const CommandMenuContext = React.createContext<ReturnType<typeof useCommandMenu> | undefined>(
  undefined
);

export function useCommandMenuContext() {
  const context = React.useContext(CommandMenuContext);
  if (!context) {
    throw new Error('useCommandMenuContext must be used within a CommandMenuProvider');
  }
  return context;
}

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const commandMenu = useCommandMenu();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        commandMenu.toggleMenu();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [commandMenu]);

  return (
    <CommandMenuContext.Provider value={commandMenu}>
      {children}
      <CommandMenuDialog />
    </CommandMenuContext.Provider>
  );
}

function CommandMenuDialog() {
  const router = useRouter();
  const { open, setOpen } = useCommandMenuContext();

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search commands</DialogTitle>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() => {
              runCommand(() => router.push('/'));
            }}
          >
            Home
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => router.push('/about'));
            }}
          >
            About
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => router.push('/pricing'));
            }}
          >
            Pricing
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
