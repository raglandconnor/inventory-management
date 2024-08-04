'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';

import { signIn } from 'next-auth/react';

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Sign in with Google
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          signIn('google', { callbackUrl: '/dashboard' });
        }}
      >
        {isLoading ? (
          <div className="animate-spin h-6 w-6 border-4 border-t-transparent rounded-full"></div>
        ) : (
          <FcGoogle className="mr-2 w-4 h-4" />
        )}{' '}
        Google
      </Button>
    </div>
  );
}
