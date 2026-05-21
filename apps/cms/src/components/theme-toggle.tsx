'use client';

import { Moon } from 'lucide-react';
import { Button } from '../../../../libs/ui/src/components/ui/button';

export function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme">
      <Moon className="h-5 w-5" />
    </Button>
  );
}
