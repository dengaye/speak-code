'use client';

interface CategoryTagsProps {
  categories: string;
}

export default function CategoryTags({ categories }: CategoryTagsProps) {
  const categoryArray = categories.split('|').map(cat => cat.trim()).filter(Boolean);

  return (
    <div className="flex flex-wrap gap-2">
      {categoryArray.map((category, index) => (
        <span 
          key={`${category}-${index}`}
          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full no-select"
        >
          {category}
        </span>
      ))}
    </div>
  );
}
