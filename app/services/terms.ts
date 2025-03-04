import { VocabItem } from '../types/vocabulary';
import { ApiService } from './api';

class TermsService {
  private tableName = 'terms';
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  async getTerms(): Promise<VocabItem[]> {
    return this.api.query<VocabItem>(this.tableName);
  }

  async searchTerms(searchTerm: string): Promise<VocabItem[]> {
    if (!searchTerm) {
      return this.getTerms();
    }

    return this.api.query<VocabItem>(this.tableName, (query) => 
      query.or(`term.ilike.%${searchTerm}%,definition.ilike.%${searchTerm}%`)
    );
  }

  async createTerm(term: Omit<VocabItem, 'id'>): Promise<VocabItem | null> {
    const results = await this.api.mutate<VocabItem>(
      this.tableName,
      'insert',
      term
    );
    return results[0] || null;
  }

  async updateTerm(id: string, term: Partial<VocabItem>): Promise<VocabItem | null> {
    const results = await this.api.mutate<VocabItem>(
      this.tableName,
      'update',
      term,
      (query) => query.eq('id', id)
    );
    return results[0] || null;
  }

  async deleteTerm(id: string): Promise<void> {
    await this.api.mutate<VocabItem>(
      this.tableName,
      'delete',
      undefined,
      (query) => query.eq('id', id)
    );
  }
}

// 导出单例实例
export const termsService = new TermsService();
