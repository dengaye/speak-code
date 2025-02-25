export interface ApiError {
  message: string;
  code: string;
  timestamp: string;
  details?: unknown;
}
