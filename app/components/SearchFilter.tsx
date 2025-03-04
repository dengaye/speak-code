'use client';

import { useState, useTransition, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchFilterProps {
  defaultSearchTerm?: string;
}

function debounce(fn: (value: string) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (value: string) => {
    if (timeoutId) {
      globalThis.clearTimeout(timeoutId);
    }
    timeoutId = globalThis.setTimeout(() => {
      fn(value);
      timeoutId = null;
    }, delay);
  };
}

export default function SearchFilter({ defaultSearchTerm = '' }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set('search', value);
        } else {
          params.delete('search');
        }
        router.push(`/?${params.toString()}`);
      });
    }, 300),
    [searchParams, router]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search terms or definitions..."
          className={`w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            isPending ? 'opacity-50' : ''
          }`}
          disabled={isPending}
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
