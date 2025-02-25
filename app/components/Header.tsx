'use client';

import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Header() {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Vocabulary List
      </h1>
    </div>
  );
}
