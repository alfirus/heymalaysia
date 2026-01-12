'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else {
        router.push('/search');
      }
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10" 
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
             <Search className="h-4 w-4" />
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
