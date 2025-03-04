import { VocabItem } from '../types/vocabulary';
import { termsService } from './terms';

export async function getStaticTerms(): Promise<{
  terms: VocabItem[];
  revalidate: number;
}> {
  try {
    const terms = await termsService.getTerms();
    return {
      terms: terms.length > 0 ? terms : [],
      revalidate: 3600, // 1 hour
    };
  } catch (error) {
    console.error('Error fetching static terms:', error);
    return {
      terms: [],
      revalidate: 3600,
    };
  }
}
