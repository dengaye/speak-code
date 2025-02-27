import { 
  createClient, 
  SupabaseClient
} from '@supabase/supabase-js';
import { ApiError } from '../types/error';

export class ApiService {
  private static instance: ApiService;
  private client: SupabaseClient;

  protected constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private handleError(error: any): any {
    console.error('API Error:', error);
    
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' ? { details: error } : {})
    };
    
    throw apiError;
  }

  public async query<T>(
    tableName: string,
    queryBuilder?: (query: any) => any
  ): Promise<T[]> {
    try {
      const baseQuery: any = this.client.from(tableName).select('*');
      
      const { data, error } = await (queryBuilder 
        ? queryBuilder(baseQuery)
        : baseQuery
      );
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async mutate<T>(
    tableName: string,
    operation: 'insert' | 'update' | 'delete',
    payload?: Record<string, any>,
    conditions?: (query: any) => any
  ): Promise<T[]> {
    try {
      let baseQuery: any = this.client.from(tableName);
      
      switch (operation) {
        case 'insert':
          baseQuery = baseQuery.insert(payload);
          break;
        case 'update':
          baseQuery = baseQuery.update(payload);
          break;
        case 'delete':
          baseQuery = baseQuery.delete();
          break;
      }

      baseQuery = baseQuery.select();

      const { data, error } = await (conditions
        ? conditions(baseQuery)
        : baseQuery
      );
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      return this.handleError(error);
    }
  }
}
