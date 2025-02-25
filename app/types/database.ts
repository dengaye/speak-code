import { SupabaseClient, PostgrestFilterBuilder, PostgrestBuilder } from '@supabase/supabase-js';

export type SupabaseQueryBuilder = ReturnType<SupabaseClient['from']>;
export type QueryFilter<T = any> = (
  query: SupabaseQueryBuilder
) => PostgrestFilterBuilder<T> | PostgrestBuilder<T>;
