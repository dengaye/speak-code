export default function VocabularySkeleton() {
  return (
    <div className="mt-6">
      <ul role="list" className="divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="py-4">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
