import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface HeaderProps {
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export default function Header({ viewMode, onViewModeChange }: HeaderProps) {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Speak Code
      </h1>
      {isLargeScreen && (
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
