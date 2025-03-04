import { unstable_cache } from 'next/cache';
import { termsService } from './terms';

// 缓存获取词汇的函数
export const getCachedTerms = unstable_cache(
  async () => {
    try {
      return await termsService.getTerms();
    } catch (error) {
      console.error('Error fetching terms for cache:', error);
      return [];
    }
  },
  ['terms-cache'],
  {
    revalidate: 3600, // 1小时后重新验证
    tags: ['terms']
  }
);
