export interface VocabItem {
  id: string;
  term: string;
  definition?: string;
  /** 多个用 | 分割的 */
  category?: string;
  /** 多个用 | 分割的 */
  symbol?: string;
  url?: string;
}
