import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isSearching?: boolean;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  isSearching
}: SearchFilterProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search terms or definitions..."
          className={`w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            isSearching ? 'opacity-50' : ''
          }`}
          disabled={isSearching}
        />
      </div>
    </div>
  );
}
