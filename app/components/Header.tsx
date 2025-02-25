import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

interface HeaderProps {
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export default function Header({ viewMode, onViewModeChange }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Frontend Vocabulary
      </h1>
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
    </div>
  );
}
